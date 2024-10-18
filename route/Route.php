<?php

include './controller/BaseController.php';
include './controller/BlogController.php';
include './controller/ContactController.php';
include './controller/ErrorController.php';
include './controller/HomeController.php';
include './controller/InfoController.php';
include './controller/ProjectsController.php';


// Credits to https://dev.to/mvinhas/simple-routing-system-for-a-php-mvc-application-16f7

/**
 * Router of the page, it processes the URI and calls the relevant controller, if it's an invalid URI it gets sent to a "404 page not found" page.
 */
class Route {
    /**
     * Takes in the information from processURI and checks if it is a valid class that exists. If so, it sends it to the relevant controller, if not it sends it to the 404 page.
     * @return void
     */
    public static function contentToRender() : void {
        $uri = self::processURI(); // localhost:8888/projects
        $class = explode('/', $uri['controller']); // '.controller/ProjectsController'

        if (class_exists($class[2])) {
            $controller = $class[2];
            $method = $uri['method'];
            $args = $uri['args'];

            /* Magic!!
             * Ternary operator, so:
             * if there are args, then call the controller with the corresponding method, with the corresponding args.
             * if there are no args, then call the controller with the corresponding method, without the args.
             */

            $args ? (new $controller)->{$method}(...$args) :
                (new $controller)->{$method}();
        } else {
            $errorController = new ErrorController();
            $errorController->index('error');
        }
    }

    /**
     * Gets the URI from the $_SERVER variable and returns tihs as an array.
     * @return array
     */
    private static function getURI() : array {
        $path_info = $_SERVER['PATH_INFO'] ?? '/';
        return explode('/', $path_info);
    }

    /**
     * This takes the array given by getURI and processes it into the relevant information for the contentToRender function.
     * @return array
     */
    private static function processURI() : array {;
        $controllerPart = self::getURI()[1] ?? '';
        $method = self::getURI()[2] ?? '';
        $numParts = count(self::getURI());
        $argsPart = [];
        for ($i = 3; $i < $numParts; $i++) {
            $argsPart[] = self::getURI()[$i] ?? '';
        }

        // Create defaults if not set.
        $controller = !empty($controllerPart) ?
            // Capitalize first letter of controllerPart so it directs to e.g. HomeController instead of homeController
            './controller/'.ucfirst($controllerPart).'Controller' :
            './controller/HomeController';

        $method = !empty($method) ? $method : 'index';

        $args = !empty($argsPart) ?
            $argsPart :
            [];

        return [
            'controller' => $controller,
            'method' => $method,
            'args' => $args
        ];
    }
}