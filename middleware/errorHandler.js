 const { constants } = require("../constants");
 const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 450;

  switch (statusCode)  {
    case constants.VALIDATION_ERROR:
        res.json({ 
            title: "Validation failed", 
            message: err.message, 
            stackTrace: err.stack 
        });

        break;
        case constants.NOT_FOUND:
            res.json({ 
                title: "Not Found", 
                message: err.message, 
                stackTrace: err.stack
            });

            case constants.FORBIDDEN:
            res.json({ 
                title: "Access Forbidden", 
                message: err.message, 
                stackTrace: err.stack
            });
            case constants.UNAUTHORIZED:
            res.json({ 
                title: "Unauthorized user error", 
                message: err.message, 
                stackTrace: err.stack
            });
            case constants.SERVER_ERROR:
            res.json({ 
                title: "Server error occured", 
                message: err.message, 
                stackTrace: err.stack
            });
  
    default:
        console.log("No error, You doing great buddy!!");
        break;
  }
 }

 module.exports = errorHandler;