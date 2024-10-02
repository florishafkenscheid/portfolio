<?php

include './controller/Controller.php';
include './controller/HomeController.php';
include './controller/ProjectsController.php';
include './controller/InfoController.php';
include './controller/ContactController.php';

// Credits to https://dev.to/mvinhas/simple-routing-system-for-a-php-mvc-application-16f7


class Route {
    public static function contentToRender() : void
    {
        $uri = self::processURI();
        $class = explode('/', $uri['controller']);
        if (class_exists($class[2])) {
            $controller = new $class[2];
            $method = $uri['method'];
            $args = $uri['args'];

            /* Magic!!
             * Ternary operator, so:
             * if there are args, then call the controller with the corresponding method, with the corresponding args.
             * if there are no args, then call the controller with the corresponding method, without the args.
             */

            $args ? $controller::{$method}($args) :
                $controller::{$method}();
        }
    }

    private static function getURI() : array {
        $path_info = $_SERVER['PATH_INFO'] ?? '/';
        return explode('/', $path_info);
    }

    private static function processURI() : array {;
        $controllerPart = self::getURI()[1] ?? '';

        // Create defaults if not set.
        $controller = !empty($controllerPart) ?
            // Capitalize first letter of controllerPart so it directs to e.g. HomeController instead of homeController
            './controller/'.ucfirst($controllerPart).'Controller' :
            './controller/HomeController';

        $method = 'redirect';

        $args = !empty($controllerPart) ?
            $controllerPart :
            'home';

        return [
            'controller' => $controller,
            'method' => $method,
            'args' => $args
        ];
    }
}