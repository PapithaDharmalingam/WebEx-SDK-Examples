import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform } from '@angular/core';
import { SdkFeatureListComponent } from './sdk-feature-list.component';
@Pipe({
  name: 'translate',
})
class TranslatePipe implements PipeTransform {
  transform(value: any): any {
    return value;
  }
}
describe('SdkFeatureListComponent', () => {
  let component: SdkFeatureListComponent;
  let fixture: ComponentFixture<SdkFeatureListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SdkFeatureListComponent ,TranslatePipe]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SdkFeatureListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
