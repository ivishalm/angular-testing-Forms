import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClientJsonpModule  }    from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { MyService } from './my-service';

@NgModule({
  imports:      [ BrowserModule, ReactiveFormsModule, HttpClientJsonpModule ],
  declarations: [ AppComponent, HelloComponent ],
  providers:    [MyService],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
