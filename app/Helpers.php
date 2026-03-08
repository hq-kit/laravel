<?php

if (! function_exists('toast')) {
    function toast($message, array $data = [], $type = 'success'): void
    {
        session()->flash('message', $message);
        session()->flash('type', $type);
        if (is_array($data)) {
            session()->flash('data', $data);
        }
    }
}
