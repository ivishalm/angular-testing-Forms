import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement }  from '@angular/core';

import { HelloComponent } from './hello.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs/observable/of';
import { MyService } from './my-service';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';



class MyServiceStub{
    submitForm(){
      return of({result: 'val', message: 'msg'})
    }
}

describe('HelloComponent', () => {

  let component: HelloComponent;
  let fixture: ComponentFixture<HelloComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
       imports: [
        ReactiveFormsModule
      ],
      declarations: [HelloComponent],
      providers: [{provide: MyService, useClass : MyServiceStub}]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should call submitForm() and set necessary values for success', () => {
    spyOn(component.mySvc,"submitForm").and.callThrough()
    const input = fixture.debugElement.query(By.css('input')).nativeElement;
    input.value = "test@gmail.com";
    input.dispatchEvent(new Event('input'));
    fixture.debugElement.query(By.css('.subscribe')).nativeElement.click();    
    fixture.detectChanges();    
    expect(component.mySvc.submitForm).toHaveBeenCalledWith("test@gmail.com");
    expect(component.submitted).toBeTruthy();
    expect(component.error).toBe("");
  });

  it('should call submitForm() and set necessary errors ', () => {
    spyOn(component.mySvc,"submitForm").and.returnValue(of({msg: "error_msg"}))
    const input = fixture.debugElement.query(By.css('input')).nativeElement;
    input.value = "test@gmail.com";
    input.dispatchEvent(new Event('input'));
    fixture.debugElement.query(By.css('.subscribe')).nativeElement.click();    
    fixture.detectChanges();    
    expect(component.mySvc.submitForm).toHaveBeenCalledWith("test@gmail.com");
    expect(component.submitted).toBeFalsy();
    expect(component.error).toBe("error_msg");
  });

  it('should not call  submitForm()', () => {
    spyOn(component.mySvc,"submitForm").and.callThrough();
    const input = fixture.debugElement.query(By.css('input')).nativeElement;
    input.value = "test";
    input.dispatchEvent(new Event('input'));
    fixture.debugElement.query(By.css('.subscribe')).nativeElement.click();    
    fixture.detectChanges();    
    expect(component.mySvc.submitForm).not.toHaveBeenCalledWith("test@gmail.com");
  });

  it('should set Error message when submitForm() errors out', () => {
    spyOn(component.mySvc,"submitForm").and.returnValue(ErrorObservable.create('error'));
    const input = fixture.debugElement.query(By.css('input')).nativeElement;
    input.value = "test@gmail.com";
    input.dispatchEvent(new Event('input'));
    fixture.debugElement.query(By.css('.subscribe')).nativeElement.click();    
    fixture.detectChanges();    
    expect(component.mySvc.submitForm).toHaveBeenCalledWith("test@gmail.com");
    expect(component.error).toBe("Sorry, an error occurred.");
  });

});