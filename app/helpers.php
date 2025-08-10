<?php

if (! function_exists('flash')) {
    function flash($message, $type = 'success'): void
    {
        session()->flash('message', $message);
        session()->flash('type', $type);
    }
}
