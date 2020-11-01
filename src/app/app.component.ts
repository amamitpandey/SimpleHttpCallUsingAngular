import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from './services/http-service.service';
import { LoaderService } from './services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'simpleHttpCall';

  years: number[] = [
    2006,
    2007,
    2008,
    2009,
    2010,
    2011,
    2012,
    2013,
    2014,
    2015,
    2016,
    2017,
    2018,
    2019,
    2020,
  ]
  satLocData: any = []
  selectedYears: number = 2006
  selectedLaunch: boolean = true
  selectedLand: boolean = true

  varCond: boolean[] = [true, false]
  constructor(
    private loaderService: LoaderService,
    private http: HttpServiceService,
  ) {
  }

  ngOnInit() {


    this.http.httpBasicGet('https://api.spacexdata.com/v3/launches?limit=100&launch_success=true', true)
      .subscribe((data) => {
        this.satLocData = data.body
        console.log("this.satLocData", this.satLocData)
      })
  }

  ngAfterViewInit() {
    // default Launch should be selected
    const tagLaunchSeleted = document.querySelector('#Launch0')
    tagLaunchSeleted.classList.add('activeButton')

    // default Launch should be selected
    const tagLand = document.querySelector('#Land0')
    tagLand.classList.add('activeButton')

    // default Year should be selected
    const tagYear = document.querySelector('#year0')
    tagYear.classList.add('activeButton')
  }

  onFilter(type, data, index) {
    console.log(type, data, index)
    const tag = document.querySelector('#' + type + index)
    if (type == 'year') {
      this.years.map((value, locIndex) => {
        if (('#' + type + index) == ('#' + type + locIndex)) {
          tag.classList.add('activeButton')
          this.selectedYears = data
        } else {
          const elseTag = document.querySelector('#' + type + locIndex)
          elseTag.classList.remove('activeButton')
        }
      })
    }

    if (type == 'Launch') {
      this.varCond.map((value, locIndex) => {
        if (('#' + type + index) == ('#' + type + locIndex)) {
          tag.classList.add('activeButton')
          this.selectedLaunch = data
        } else {
          const elseTag = document.querySelector('#' + type + locIndex)
          elseTag.classList.remove('activeButton')
        }
      })
    }

    if (type == 'Land') {
      this.varCond.map((value, locIndex) => {
        if (('#' + type + index) == ('#' + type + locIndex)) {
          tag.classList.add('activeButton')
          this.selectedLand = data
        } else {
          const elseTag = document.querySelector('#' + type + locIndex)
          elseTag.classList.remove('activeButton')
        }
      })
    }
    this.callFilterApi()

  }

  callFilterApi() {
    console.log(this.selectedYears, this.selectedLaunch, this.selectedLand)
    let url = ''
    if (this.selectedLaunch == true) {
      url = 'https://api.spaceXdata.com/v3/launches?limit=100&launch_success=true'
    }
    if (this.selectedLaunch == true && this.selectedLand == true) {
      url = 'https://api.spaceXdata.com/v3/launches?limit=100&launch_success=true&land_success=true'
    }
    if (this.selectedYears > 0) {
      url = "https://api.spaceXdata.com/v3/launches?limit=100&launch_success=" + this.selectedLand + "&land_success=" + this.selectedLaunch + "&launch_year=" + this.selectedYears + ""
    }
    this.http.httpBasicGet(url, true)
      .subscribe((data) => {
        this.satLocData = data.body
        console.log("this.satLocData", this.satLocData)
      })
  }

}
