import * as express from 'express';
// const express = require('express');
import * as bodyParser from 'body-parser';
// import * as cookieParser from 'cookie-parser';
// import * as logger from 'morgan';
import * as path from 'path';
// import * as errorHandler from 'errorhandler';
// import * as cors from 'cors';
// import * as jwt from 'jsonwebtoken';

import { BaseRoute } from './base/router/base-route';
// import { CheckPermissionModel } from './modules/security';
// import { CONFIGURATIONS } from './modules/base';
// import { PROD_ENV, DEV_ENV } from './modules/base/conf/local-settings';
// import { ErrorHandler } from './modules/base/conf/error-handler';

/**
 * The server.
 *    static app: any;

 * @class Server
 */
export class Server {
  public app: express.Application;

  /**
   * Bootstrap the application.
   *
   * @class Server
   * @method bootstrap
   * @static
   * @return {ng.auto.IInjectorService} Returns the newly created injector for this app.
   */
  public static bootstrap(): Server {
    return new Server();
  }

  /**
   * Constructor.
   *
   * @class Server
   * @constructor
   */
  constructor() {
    //create expressjs application
    this.app = express();
    // this.config();
    this.routes();
  }

  /**
   * Create REST API routes
   *
   * @class Server
   * @method api
   */
  public api() {
    //empty for now
  }

  /**
   * Configure application
   *
   * @class Server
   * @method config
   */
//   public config() {

//     CONFIGURATIONS.environment = process.env.NODE_ENV === 'production' ? PROD_ENV : DEV_ENV;

//     this.app.use(cors({ origin: CONFIGURATIONS.environment.frontendURL }));
//     this.app.use(express.static(path.join(__dirname, 'public')));
//     // this.app.use(bodyParser.json());
//     this.app.use(bodyParser.json({ limit: '250mb' }));
//     this.app.use(bodyParser.urlencoded({ extended: true }));

//     /**
//      * mount cookie parser middleware
//      */
//     this.app.use(cookieParser('SECRET_GOES_HERE'));

//     // catch 404 and forward to error handler
//     this.app.use(function (err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
//       err.status = 404;
//       next(err);
//     });

//     // catch 404 and forward to error handler
//     this.app.use(function (err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
//       var error = new Error('Not Found');
//       err.status = 404;
//       next(err);
//     });

//     this.errorHandler();
//   }

  /**
   * Handle error.
   * TODO:high:Mohsin: error handling not working properly also build proper understanding
   * @class Server
   * @method errorHandler
   * @return void
   */
  private errorHandler() {
    this.app.use(function (err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
      this.app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
        console.log('Error handler: -------------------------------------');

        return res.status(err.status || 500).send({
          message: err.message || err.name || err
        });
      });
    });
  }

  /**
   * authorize jsonwebtoken
   * @param req
   * @param res
   * @param next
   */
//   private authorize(req, res, next) {
//     // TODO:low: Following is not proper way to skip auth on public URLs. There should be some configuration in jwt to skip some public urls
//     var foundPublicUrl = CONFIGURATIONS.PUBLIC_URLS.find(element => {

//       if (element == req.originalUrl) {
//         return true;
//       } else {
//         // check if url exists in public urls without last parameter i.e id 
//         let lastIndex = req.originalUrl.lastIndexOf('/');
//         let originalUrl = req.originalUrl.substr(0, lastIndex);
//         if (element == originalUrl) {
//           return true;
//         }
//       }

//     });

//     if (foundPublicUrl) {
//       //TODO:high: For now Mohsin has added delay on each request to test the loading issues for user interactivity
//       // Remove it before pusing to server.
//       // return new Promise((resolve, reject) => {
//       //   setTimeout(() => {
//       //     resolve(true);
//       //   }, 1500);
//       // }).then(() => {
//       //   next();
//       // })
//       next();
//     } else {
//       // check header or url parameters or post parameters for token
//       let token = req.headers['token'];

//       // decode token
//       if (token) {
//         // verifies secret and checks exp
//         jwt.verify(token, CONFIGURATIONS.SECRET, function (err, decoded) {
//           if (err) {
//             return res.json({
//               error: true,
//               message: 'Failed to authenticate token.'
//             });
//           } else {

//             let userId = decoded.id;

//             // Set identity here to be used in base model for created/updated by and for some other cases.
//             CONFIGURATIONS.identity = { userId: userId }

//             return new CheckPermissionModel().checkPermission(userId, req.originalUrl).then(result => {
//               if (result) {
//                 //TODO:high: For now Mohsin has added delay on each request to test the loading issues for user interactivity
//                 // Remove it before pusing to server.
//                 // return new Promise((resolve, reject) => {
//                 //   setTimeout(() => {
//                 //     resolve(true);
//                 //   }, 1500);
//                 // }).then(() => {
//                 //   next();
//                 // })
//                 next();
//               } else {
//                 return ErrorHandler.sendAuthorizationError(ErrorHandler.notPermitted, res, next);
//               }
//             });
//           }
//         });
//       } else {
//         // if there is no token
//         return ErrorHandler.sendAuthorizationError(ErrorHandler.invalidToken, res, next);
//       }
//     }
//   }

  /**
   * Create and return Router.
   *
   * @class Server
   * @method config
   * @return void
   */
  private routes() {
    let router: express.Router;
    router = express.Router();
    // router.use(this.authorize);

    new BaseRoute(router);
    this.app.use('/', router);
  }
}
