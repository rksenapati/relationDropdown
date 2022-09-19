import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  firstLevelArr = [
    { id: "1", name: "India" },
    { id: "2", name: "Germany" },
  ];
  secondLevelArr = [
    { id: "s1", parentId: "2", name: "Bavaria" },
    { id: "s2", parentId: "2", name: "Berlin" },
    { id: "s3", parentId: "1", name: "Maharashtra" },
    { id: "s4", parentId: "1", name: "Tamilnadu" },
  ];
  thirdLevelArr = [
    { id: "d1", parentId: "s1", name: "Upper Bavaria" },
    { id: "d2", parentId: "s1", name: "Lower Bavaria" },
    { id: "d3", parentId: "s2", name: "Berlin-Mitte" },
    { id: "d4", parentId: "s2", name: "Kreuzberg" },
    { id: "d5", parentId: "s3", name: "Nashik" },
    { id: "d6", parentId: "s3", name: "Jalgoan" },
    { id: "d7", parentId: "s4", name: "Ariyalur" },
    { id: "d8", parentId: "s4", name: "Chennai" },
  ];
  fourthLevelArr = [
    { id: "p1", parentId: "d1", name: "Munich" },
    { id: "p2", parentId: "d1", name: "Erding" },
    { id: "p3", parentId: "d2", name: "Leipzig" },
    { id: "p4", parentId: "d2", name: "Landshut" },
    { id: "p5", parentId: "d3", name: "Passau" },
    { id: "p6", parentId: "d3", name: "Gesundbrunnen" },
    { id: "p7", parentId: "d4", name: "Frieburg" },
    { id: "p8", parentId: "d4", name: "Hamburg" },
    { id: "p9", parentId: "d6", name: "Raver" },
    { id: "p10", parentId: "d6", name: "Savda" },
    { id: "p11", parentId: "d5", name: "Ozar" },
    { id: "p12", parentId: "d5", name: "Manmad" },
    { id: "p13", parentId: "d7", name: "Thirumanur" },
    { id: "p14", parentId: "d7", name: "Sendurai" },
    { id: "p15", parentId: "d8", name: "New Chennai" },
    { id: "p16", parentId: "d8", name: "Old Chennai" },
  ];
  obj = [];
  countries = {};
  states = {};
  districts = {};
  places = {};
  ngOnInit() {
    this.obj = this.stracture(
      this.thirdLevelArr,
      this.fourthLevelArr,
      "places"
    );
    this.obj = this.stracture(this.secondLevelArr, this.obj, "districts");
    this.obj = this.stracture(this.firstLevelArr, this.obj, "states");
    this.obj.forEach((res) => {
      if (this.countries["countries"]) {
        this.countries["countries"][res.id] = { ...res };
      } else {
        this.countries["countries"] = {};
        this.countries["countries"][res.id] = { ...res };
      }
    });
  }
  onChange(event, text) {
    console.log(event.value);
    if (event.value) {
      if (text === "states") {
        this.states = this.countries["countries"][event.value][text];
        console.log(this.states);
      } else if (text == "districts") {
        this.districts = this.states[event.value][text];
      } else if ((text = "places")) {
        this.places = this.districts[event.value][text];
      }
    }
  }
  stracture(first, second, textToBind) {
    let obj = [...first];
    second.forEach((res) => {
      let findIndex = obj.findIndex((data) => data.id === res.parentId);
      if (obj[findIndex][textToBind]) {
        obj[findIndex][textToBind][res.id] = { ...res };
      } else {
        obj[findIndex][textToBind] = {};
        obj[findIndex][textToBind][res.id] = { ...res };
      }
    });
    console.log(obj);
    return obj;
  }
}
