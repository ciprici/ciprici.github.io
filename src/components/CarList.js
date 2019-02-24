import React, { Component } from 'react';
import config from "../config";
import {load} from "../helpers/spreadsheet";

class CarList extends Component {
 
    render() {
        const { cars, error } = this.state;
        if (error) {
          return <div>{this.state.error}</div>;
        }
        return (
          <ul>
            {cars.map((car, i) => (
              <li key={i}>
                {car.year} {car.make} {car.model}
              </li>
            ))}
          </ul>
        );
      }

    componentDidMount() {
        // 1. Load the JavaScript client library.
        window.gapi.load("client", this.initClient);
    }

    initClient = () => {
        // 2. Initialize the JavaScript client library.
        window.gapi.client
          .init({
            apiKey: config.apiKey,
            // Your API key will be automatically added to the Discovery Document URLs.
            discoveryDocs: config.discoveryDocs
          })
          .then(() => {
          // 3. Initialize and make the API request.
          load(this.onLoad);
        });
      };

      onLoad = (data, error) => {
        if (data) {
          const cars = data.cars;
          this.setState({ cars });
        } else {
          this.setState({ error });
        }
      };

      state = {
        cars: [],
        error: null
      }
}
export default CarList;
