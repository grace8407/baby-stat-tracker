import React,{ Component } from 'react';
import moment from 'moment';
import callBabyStatsAPI from './babystats'

const request =
{
      "id": ,
      "accessToken": "",
      "dateRange": "",
      "duration": "",
      "statType": "",
      "event": "GetData",
      "babyName" : "",
      "isApplication": true,
}

class LastFeeding extends Component {
  constructor(props) {
      super(props);
      this.state = {
        side: "",
        time: "",
      };
    }

  async componentDidMount() {
    // Load async data.
    let response = await callBabyStatsAPI(request);
    let feedingData = response.data.data.lastStats.AddFeeding;
    let now = moment();
    var formattedTime = moment(feedingData.transactionDateTime).format('llll')
    let side = (feedingData.breastSide === 1) ? "Left" : "Right";
    
    let timeSinceLastFeeding = moment.duration(now.diff(formattedTime))
    let hoursSince = timeSinceLastFeeding.hours()
    let minutesSince = timeSinceLastFeeding.minutes()

    this.setState({
      hoursSince,
      minutesSince, 
      side,
      time: formattedTime.toString()
    })
  }
    
  render() {
    return (
      <div>
        <p>Fed on <mark>{this.state.side}</mark> side {this.state.hoursSince} hour(s) and {this.state.minutesSince} minute(s) ago</p>
        <p>Feeding time: {this.state.time}</p>
      </div>
    );
  }
}

export default LastFeeding;