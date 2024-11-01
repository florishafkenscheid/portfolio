<?php

class ContactController extends BaseController { 
    public function index(string $path = 'contact') {
        parent::index($path);
    }
    // The contact form doesn't actually do anything yet, if I were to implement it I know there is a mail() function for PHP which I could set up to send mail to contact- or info@blousy.dev
}