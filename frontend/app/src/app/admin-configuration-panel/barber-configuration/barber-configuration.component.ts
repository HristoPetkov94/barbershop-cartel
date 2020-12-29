import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {BarberService} from '../../services/barber.service';
import {Barber} from '../../models/barber';

@Component({
  selector: 'app-barber-configuration',
  templateUrl: './barber-configuration.component.html',
  styleUrls: ['./barber-configuration.component.css', '../shared-styles/shared.css']
})
export class BarberConfigurationComponent implements OnInit {

  public barbers: Barber[];
  public selectedFile: File = null;
  public isFileSelected = false;

  @ViewChild('chooseFile') public chooseFile: ElementRef;

  constructor(private barberService: BarberService) {
  }

  ngOnInit(): void {

    this.barberService.getBarbers().subscribe(data => {
      this.barbers = data;
    });
  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
    this.isFileSelected = true;
  }

  onUpload(barber: any) {
    if (!this.isFileSelected) {
      this.chooseFile.nativeElement.click();
    } else {

      this.barberService.updateBarberPicture(barber.id, this.selectedFile).subscribe(d => console.log('upload is comeplete'),
        err => console.log(err),
        () => {
          this.isFileSelected = false;
          this.ngOnInit();
        });
    }
  }

  add() {
    const barber = new Barber();

    barber.id = this.barbers.length + 1;
    console.log('add: ', barber);
    this.barbers.push(barber);
  }

  remove(id: number) {
    console.log('remove: ', id);
    this.barbers = this.barbers.filter(barber => barber.id !== id);
  }

  save() {
    for (const barber of this.barbers) {
      console.log('updating: ', barber);
      this.barberService.updateBarber(barber);
    }
  }
}
