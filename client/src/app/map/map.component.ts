import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';

import Map from 'ol/Map';
import Tile from 'ol/layer/Tile';
import Feature from 'ol/Feature';
import OSM from 'ol/source/OSM';
import View from 'ol/View';
import VectorLayer from 'ol/layer/Vector.js';
import VectorSource from 'ol/source/Vector.js';
import { Point, Polygon, MultiPolygon } from 'ol/geom.js';
import { Style, Text, Fill, Stroke } from 'ol/style.js';
import { defaults as defaultControls } from 'ol/control.js';
import { fromLonLat } from 'ol/proj';
import Select from 'ol/interaction/Select.js';
import { click } from 'ol/events/condition.js';
import Overlay from 'ol/Overlay.js';
import GeoJSON from 'ol/format/GeoJSON';

import * as state from '../shared/state';
import { Equipment } from '../shared/models/equipment/equipment.model';
import { JobManagement } from '../shared/models/jobs/job-management.model';
import { ZonePoly } from '../shared/models/equipment/zone-poly.model';
import { MapView } from '../shared/models/map/map-view.model';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  latitude = 4346124.387119868;
  longitude = -10492975.202173969;

  map: any;
  features = new Array();
  featuresFiltered = new Array();
  zonePolys: Array<ZonePoly>;
  polys = new Array();
  masterFeatures = {
    type: '',
    crs: {},
    features: []
  };
  localFeatures = {
    type: '',
    crs: {},
    features: []
  };
  stateFeatures = {
    type: '',
    crs: {},
    features: []
  };
  equipmentList: Array<Equipment>;
  jobList: Array<JobManagement>;
  equipmentUpdating: boolean;
  vectorSource: VectorSource = null;
  masterSource: VectorSource = null;
  masterLayer: VectorLayer = null;
  localSource: VectorSource = null;
  localLayer: VectorLayer = null;
  stateSource: VectorSource = null;
  stateLayer: VectorLayer = null;
  selectedFilter = [
    { title: 'All equipment', type: 'allEquipment', avtive: true, count: 0 },
    { title: 'Monitored on', type: 'monitoredOn', avtive: false, count: 0 },
    { title: 'Monitored off', type: 'monitoredOff', avtive: false, count: 0 },
    { title: 'Not monitored', type: 'notMonitored', avtive: false, count: 0 },
    { title: 'No zone configured', type: 'noZoneConfigured', avtive: false, count: 0 }
  ];
  // selectedItem = 0;
  isBuildingMap = true;
  ct = 0;
  totalMasterFeatures = 0;
  totalLocalFeatures = 0;
  totalStateFeatures = 0;

  viewModel$: Observable<MapView>;
  // viewModel: MapView;

  constructor(private equipmentState: state.EquipmentState,
    private zoneState: state.ZoneState,
    private mapViewSate: state.MapViewState,
    private jobState: state.JobsState,
    private router: Router) { }

  ngOnInit(): void {
    this.viewModel$ = this.mapViewSate.mapView;
    // this.viewModel = this.mapViewSate.getMapViewState();
    combineLatest(
      [this.equipmentState.equipment,
      this.zoneState.zonePolys,
      this.jobState.jobsManagementStatus,
      this.equipmentState.equipmentUpdating]
    ).subscribe(([equipments, jobs]) => {
      this.checkEquipment();
    });
  }

  checkEquipment(): void {
    this.jobList = this.jobState.getJobManagement();
    this.equipmentList = this.equipmentState.getLatestEquipment();
    this.zonePolys = this.zoneState.getLatestZonePolys();
    this.equipmentUpdating = this.equipmentState.getEquipmentUpdating();

    const vs = this.mapViewSate.getMapViewState();
    if (this.equipmentList.length > 0 && this.jobList.length > 0 && !this.equipmentUpdating) {
      this.buildPolys();
      this.buildFeatures();
      this.buildMap();
      this.masterLayer.setVisible(vs.isMasterPoly);
      this.localLayer.setVisible(vs.isLocalPoly);
      this.stateLayer.setVisible(vs.isStatePoly);
      this.makeSummary();
    }
  }

  makeSummary(): void {
    const total = this.features.length;
    const totalMonitoredOn = this.features.filter(feature => feature.values_.name === 'monitoredOn').length;
    const totalMonitoredOff = this.features.filter(feature => feature.values_.name === 'monitoredOff').length;
    const totalNotMonitored = this.features.filter(feature => feature.values_.name === 'notMonitored').length;
    const totalNoZoneConfigured = this.features.filter(feature => feature.values_.name === 'noZoneConfigured').length;
    this.selectedFilter[0].count = total;
    this.selectedFilter[1].count = totalMonitoredOn;
    this.selectedFilter[2].count = totalMonitoredOff;
    this.selectedFilter[3].count = totalNotMonitored;
    this.selectedFilter[4].count = totalNoZoneConfigured;
    this.totalMasterFeatures = this.masterFeatures.features.length;
    this.totalLocalFeatures = this.localFeatures.features.length;
    this.totalStateFeatures = this.stateFeatures.features.length;
  }

  buildMap(): void {
    // console.log('buildMap called');
    const vs = this.mapViewSate.getMapViewState();
    // TODO: REmove this hack
    this.ct = (this.ct + 1);
    if (!this.isBuildingMap) {
      this.refreshMap();
      this.refreshZonePolyMap();
      return;
    }

    this.isBuildingMap = false;

    this.vectorSource = new VectorSource({
      features: this.featuresFiltered,
      wrapX: false
    });

    this.masterSource = new VectorSource({
      features: (new GeoJSON()).readFeatures(this.masterFeatures)
    });

    this.localSource = new VectorSource({
      features: (new GeoJSON()).readFeatures(this.localFeatures)
    });

    this.stateSource = new VectorSource({
      features: (new GeoJSON()).readFeatures(this.stateFeatures)
    });

    const vectorLayer = new VectorLayer({
      source: this.vectorSource,
      updateWhileAnimating: true,
      updateWhileInteracting: true,
    });

    this.masterLayer = new VectorLayer({
      source: this.masterSource,
      style: new Style({
        stroke: new Stroke({
          color: 'rgba(0, 0, 255, 0.5)',
          width: 2
        }),
        fill: new Fill({
          color: 'rgba(0, 0, 255, 0.1)'
        })
      })
    });

    this.localLayer = new VectorLayer({
      source: this.localSource,
      style: new Style({
        stroke: new Stroke({
          color: 'rgba(172, 72, 172, 0.5)',
          width: 2
        }),
        fill: new Fill({
          color: 'rgba(172, 72, 172, 0.1)'
        })
      })
    });

    this.stateLayer = new VectorLayer({
      source: this.stateSource,
      style: new Style({
        stroke: new Stroke({
          color: 'rgba(80, 247, 80, 0.5)',
          // lineDash: [4],
          width: 2
        }),
        fill: new Fill({
          color: 'rgba(80, 247, 80, 0.1)'
        })
      })
    });

    this.map = new Map({
      target: 'map',
      controls: defaultControls(),
      layers: [
        new Tile({
          source: new OSM('OSM (with buffer)', null, { buffer: 2 }) // new OSM()
        }),
        // new OSM('OSM (without buffer)'),
        // new OSM('OSM (with buffer)', null, {buffer: 2}),
        this.stateLayer,
        this.masterLayer,
        this.localLayer,
        vectorLayer
      ],
      view: new View({
        center: [vs.longitude, vs.latitude],
        zoom: vs.zoom,
        projection: 'EPSG:3857'
      })
    });

    const selectClick = new Select({
      condition: click
    });

    if (selectClick !== null) {
      this.map.addInteraction(selectClick);
      selectClick.on('select', (e) => {
        e.selected.forEach((f) => {
          // Collect the properties of the TMC Node or zone that was clicked on
          const gt = f.values_.geometry;
          const props = f.getProperties();

          if (gt instanceof Polygon || gt instanceof MultiPolygon) {
            // get all features under the mouse
            let place = null;
            const allFeaturesAtPixel = [];
            const event = e.mapBrowserEvent;
            const zna = [];
            this.map.forEachFeatureAtPixel(event.pixel, (feature, layer) => {
              allFeaturesAtPixel.push(feature);
              place = feature;
            });
            if (place) {
              for (const fe of allFeaturesAtPixel) {
                const p = fe.getProperties();
                const z = p[0].zone;
                zna.push(z);
              }
            } else {
              console.log('No feature');
            }
            // Set the selected zones
            this.zoneState.setSelectedZones(zna);
            // Navigate to zone picker
            this.router.navigateByUrl('/inventory/zone-filter');
          } else if (gt instanceof Point) {
            // Set the next tmc on the observable chain
            this.equipmentState.setTmc(props);
            // Navigate to tmc picker
            this.router.navigateByUrl(`/inventory/tmc-filter?lat=${props.lat}&lon=${props.lon}`);
          }
        });
      });
    }
    this.map.on('pointermove', this.displayTooltip);

    this.map.on('moveend', (evt) => {
      const mv = evt.map.getView();
      const center = mv.getCenter();
      const zoom = mv.getZoom();
      this.updatePosition(center, zoom);
    });

    this.doFilter(vs.selectedValue, vs.selectedItem);
  }

  private updatePosition(center, zoom): void {
    const mvs = this.mapViewSate.getMapViewState();
    mvs.longitude = center[0];
    mvs.latitude = center[1];
    mvs.zoom = zoom;
    this.mapViewSate.setMapViewState(mvs);
  }

  displayTooltip(evt): void {
    const pixel = evt.pixel;
    const tooltip = document.getElementById('tooltip');
    const overlay = new Overlay({
      element: tooltip,
      offset: [0, -20],
      positioning: 'center-center'
    });
    evt.map.addOverlay(overlay);
    const feature = evt.map.forEachFeatureAtPixel(pixel, (f) => {
      return f;
    });
    tooltip.style.display = feature ? '' : 'none';
    if (feature) {
      overlay.setPosition(evt.coordinate);
      const address = feature.get('addressTitle');
      const properties = feature.getProperties((o) => {
        return o;
      });
      const zone = properties[0];

      if (address) {
        tooltip.innerText = address;
      }
      if (zone) {
        tooltip.innerText = zone.zone;
      }
    }
  }

  // TODO: zones are now a list - this needs to be refactored.
  checkMonitoredZone(automationUnitCode, zns): any {
    const jobs = this.jobList.filter(job => zns.filter(zone => zone.zone === job.zoneID).length >= 0 && job.tmcID === automationUnitCode);
    if (jobs.length === 0) {
      return { monitoring: false };
    } else {
      const activeJobs = jobs.filter(job => (job.active === true));
      return { monitoring: true, active: activeJobs.length > 0 };
    }
  }

  buildPolys(): void {
    const masterPolys = this.zonePolys.filter(x => x.properties[0].zt === 'Master');
    const localPolys = this.zonePolys.filter(x => x.properties[0].zt === 'Local');
    const statePolys = this.zonePolys.filter(x => x.properties[0].zt === 'State Wide');

    this.masterFeatures = {
      type: 'FeatureCollection',
      crs: {
        type: 'name',
        properties: {
          name: 'EPSG:3857'
        }
      },
      features: masterPolys
    };

    this.localFeatures = {
      type: 'FeatureCollection',
      crs: {
        type: 'name',
        properties: {
          name: 'EPSG:3857'
        }
      },
      features: localPolys
    };

    this.stateFeatures = {
      type: 'FeatureCollection',
      crs: {
        type: 'name',
        properties: {
          name: 'EPSG:3857'
        }
      },
      features: statePolys
    };

  }

  buildFeatures(): void {
    // console.log('build features called');
    this.equipmentList.forEach(element => {
      const pos = fromLonLat([+element.lon, +element.lat]);
      const iconFeature = new Feature({
        geometry: new Point(pos),
        labelPoint: new Point(pos),
        _id: element._id,
        addressCode: element.addressCode,
        automationUnitCode: element.automationUnitCode,
        addressTitle: element.addressTitle,
        zone: element.zones[1],
        lat: element.lat,
        lon: element.lon
      });

      let iconStyle: any;
      const monitoring = this.checkMonitoredZone(element.automationUnitCode, element.zones);

      if (monitoring.monitoring) {
        if (monitoring.active) {
          iconStyle = new Style({
            text: new Text({
              text: '\uf144',
              font: 'normal 18px FontAwesome',
              textBaseline: 'middle',
              fill: new Fill({
                color: '#00ff00',
              }),
              stroke: new Stroke({
                color: '#000',
                width: 4,
              })
            }),
            zIndex: 3
          });
          iconFeature.setStyle(iconStyle);
          iconFeature.set('name', 'monitoredOn');
        } else {
          iconStyle = new Style({
            text: new Text({
              text: '\uf28b',
              font: 'normal 18px FontAwesome',
              textBaseline: 'middle',
              fill: new Fill({
                color: 'yellow',
              }),
              stroke: new Stroke({
                color: '#000',
                width: 4,
              })
            }),
            zIndex: 2
          });
          iconFeature.setStyle(iconStyle);
          iconFeature.set('name', 'monitoredOff');
        }
      } else {
        if (element.zones.length > 0) {
          iconStyle = new Style({
            text: new Text({
              text: '\uf058',
              font: 'normal 18px FontAwesome',
              textBaseline: 'middle',
              fill: new Fill({
                color: '#9cc2ff',
              }),
              stroke: new Stroke({
                color: '#000',
                width: 4,
              })
            }),
            zIndex: 1
          });
          iconFeature.setStyle(iconStyle);
          iconFeature.set('name', 'notMonitored');
        } else {
          iconStyle = new Style({
            text: new Text({
              text: '\uf059',
              font: 'normal 18px FontAwesome',
              textBaseline: 'middle',
              fill: new Fill({
                color: '#dedede',
              }),
              stroke: new Stroke({
                color: '#000',
                width: 4,
              })
            })
          });
          iconFeature.setStyle(iconStyle);
          iconFeature.set('name', 'noZoneConfigured');
        }
      }
      // console.log('called', this.ct);
      if (this.ct === 0) {
        this.features.push(iconFeature);
      }
      this.featuresFiltered = this.features;
    });
  }

  doFilter(type, index): void {
    const vs = this.mapViewSate.getMapViewState();
    switch (type) {
      case 'monitoredOn':
        this.featuresFiltered = this.features.filter(feature => feature.values_.name === 'monitoredOn');
        break;
      case 'monitoredOff':
        this.featuresFiltered = this.features.filter(feature => feature.values_.name === 'monitoredOff');
        break;
      case 'notMonitored':
        this.featuresFiltered = this.features.filter(feature => feature.values_.name === 'notMonitored');
        break;
      case 'noZoneConfigured':
        this.featuresFiltered = this.features.filter(feature => feature.values_.name === 'noZoneConfigured');
        break;
      default:
        this.featuresFiltered = this.features;
    }
    vs.selectedItem = index;
    vs.selectedValue = type;
    this.refreshMap();
  }

  refreshMap(): void {
    this.vectorSource.clear(true);
    this.vectorSource.addFeatures(this.featuresFiltered);
  }

  refreshZonePolyMap(): void {
    this.masterSource.clear(true);
    this.masterSource.addFeatures((new GeoJSON()).readFeatures(this.masterFeatures));
    this.localSource.clear(true);
    this.localSource.addFeatures((new GeoJSON()).readFeatures(this.localFeatures));
    this.stateSource.clear(true);
    this.stateSource.addFeatures((new GeoJSON()).readFeatures(this.stateFeatures));
  }

  showMaster(): void {
    const vs = this.mapViewSate.getMapViewState();
    vs.isMasterPoly = !vs.isMasterPoly;
    this.mapViewSate.setMapViewState(vs);
    this.masterLayer.setVisible(vs.isMasterPoly);
  }

  showLocal(): void {
    const vs = this.mapViewSate.getMapViewState();
    vs.isLocalPoly = !vs.isLocalPoly;
    this.mapViewSate.setMapViewState(vs);
    this.localLayer.setVisible(vs.isLocalPoly);
  }

  showState(): void {
    const vs = this.mapViewSate.getMapViewState();
    vs.isStatePoly = !vs.isStatePoly;
    this.mapViewSate.setMapViewState(vs);
    this.stateLayer.setVisible(vs.isStatePoly);
  }

}
