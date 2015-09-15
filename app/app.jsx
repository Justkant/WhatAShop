import React from "react";
import Main from './main/main.jsx';

bootstrap();

function bootstrap() {
    const app = document.createElement('div');
    document.body.appendChild(app);

    React.render(<Main title="WhatAShop"/>, app);
}