import React,{ Component } from 'react';
import callBabyStatsAPI from './babystats'
import {Growl} from 'primereact/growl';
import {Button} from 'primereact/button';

import 'primeicons/primeicons.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';


let request =
{
      "id": ,
      "accessToken": "",
      "event": "AddFeeding",
      "bottleOunces": "", 
      "feedingMinutes": "",
      "breastSide": "", 
      "uom" : "",
      "babyName" : "",
      "eventTime" : "",
      "isApplication": true,
}


class NextFeeding extends Component {
    async logFeeding(side) {
        console.log(side);
        let customRequest = request;
        customRequest.breastSide = side;
        console.log(customRequest);
        let response = await callBabyStatsAPI(request);
    }
    
    handleFeeding = (event) => {
        
        if( !event.target.id ) {
            this.growl.show({severity: 'error', summary: 'Derb', detail: "Try again"});
        } else {
            this.logFeeding(event.target.id);
            let side = event.target.id === "1" ? "left" : "right";
            let growlMessage = `Logged ${side} side`;
            this.growl.show({severity: 'success', summary: 'Got it', detail: growlMessage});
        }
    }

    render() {
        return (
            <div className="p-fluid">
                <div className="p-grid">
                    <div className="p-col button">
                        <Button onClick={this.handleFeeding} label="L" id="1"/>
                    </div>
                    <div className="p-col button">
                        <Button onClick={this.handleFeeding} label="R" id="2"/>
                    </div>
                </div>
            
                <Growl className="growl" ref={(el) => this.growl = el} position="bottomright" />
            </div>
        
        );
    }
}

export default NextFeeding;

