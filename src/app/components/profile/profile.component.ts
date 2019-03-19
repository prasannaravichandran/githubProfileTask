import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { debounceTime , map } from 'rxjs/operators';
import { DataService } from "../../services/data.service";

const statesWithFlags: {name: string, profileImg: string}[] = [
  {'name': 'PrasannaRavichandran', 'profileImg': 'https://avatars2.githubusercontent.com/u/13754424?v=4'},
  {'name': 'Mark', 'profileImg': 'https://avatars1.githubusercontent.com/u/297?v=4'},
  {'name': 'Thoughtpunch', 'profileImg': 'https://avatars2.githubusercontent.com/u/140802?v=4'},
  {'name': 'iancanderson', 'profileImg': 'https://avatars2.githubusercontent.com/u/180798?v=4'},
  {'name': 'jgiudicelli', 'profileImg': 'https://avatars2.githubusercontent.com/u/487694?v=4'},
  {'name': 'wunderbar', 'profileImg': 'https://avatars1.githubusercontent.com/u/561879?v=4'},
  {'name': 'Jonplussed', 'profileImg': 'https://avatars1.githubusercontent.com/u/749073?v=4'},
  {'name': 'jonesdeini', 'profileImg': 'https://avatars1.githubusercontent.com/u/1105745?v=4'},
  {'name': 'csaurav', 'profileImg': 'https://avatars1.githubusercontent.com/u/1618613?v=4'},
  {'name': 'BenKanouse', 'profileImg': 'https://avatars3.githubusercontent.com/u/1371190?v=4'},
  {'name': 'buhti', 'profileImg': 'https://avatars2.githubusercontent.com/u/2093313?v=4'},
  {'name': 'rakeshasp', 'profileImg': 'https://avatars2.githubusercontent.com/u/1258350?v=4'},
  {'name': 'zobar', 'profileImg': 'https://avatars2.githubusercontent.com/u/185470?v=4'},
  {'name': 'jhsu', 'profileImg': 'https://avatars1.githubusercontent.com/u/648?v=4'},
  {'name': 'sunnygleason', 'profileImg': 'https://avatars0.githubusercontent.com/u/153621?v=4'}
];
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
    public model: any;
    public userData: any;
    public tabs: Object = {};

    /*
    * typeahead configuration and formatting
    */
    search = (text$: Observable < string > ) =>
        text$.pipe(
            debounceTime(200),
            map(term => term === '' ? [] :
                statesWithFlags.filter(v => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
        )

    formatter = (x: {
        name: string
    }) => x.name;

    constructor(private dataService: DataService) {}

    ngOnInit() {
        this.tabs = {
            "1": true
        }
    }
    /*
    * This function is used to get the details of the selected user from the typeahead
    */
    selectedItem(result) {
        if (result) {
            this.dataService.getUserdetails(result.item.name).subscribe((data) => {
                this.userData = data;
                this.getFollowersList(data['followers_url']);
                this.getReposList(data['repos_url']);
            });
        }
    }

    /*
    * Used for switching the tab
    */
    switchTab(tab) {
        this.tabs = {};
        this.tabs[tab] = true;
    }

    /*
     * Get the followers details from the api
     */
    getFollowersList(url) {
        this.dataService.getFollowersdetails(url).subscribe((data) => {
            this.userData['followersList'] = data
        });
    }
    /*
     * Get the Repository details from the api
     */
    getReposList(url) {
        this.dataService.getRepodetails(url).subscribe((data) => {
            this.userData['repoList'] = data
        });
    }

}
