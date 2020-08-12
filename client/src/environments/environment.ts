// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  appId: 'f9ae7ad578a6d06724a140168b4dfc95',
  baseUrl: 'http://localhost:3000/api/',
  jobAPIUrl: 'http://localhost:3005/api/',
  docsUrl: 'http://localhost:3000/api-docs/',
  busUrl: 'http://localhost:8080/',
  socketUrl: 'http://localhost:3000',
  sourceVideoUrl: 'https://develop-api.reach.spectrumtoolbox.com/api/s3',
  targetVideoUrl: 'https://develop-api.reach.spectrumtoolbox.com/api/s3',
  logsUrl: 'https://log-api.develop.reach.spectrumtoolbox.com/logs/',
  baseHref: '/',
  logSocket: 'http/localhost:3003',
  apiHeaderKey: 'x-charter-api-key',
  apiHeaderValue: 'live_edge@2019',
  polyUrl: 'http://localhost:3004/api/'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
