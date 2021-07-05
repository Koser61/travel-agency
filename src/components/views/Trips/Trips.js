import React from 'react';
import PropTypes from 'prop-types';

import TripSummary from '../../features/TripSummary/TripSummary';
import Section from '../../layout/Section/Section';
import PageTitle from '../../common/PageTitle/PageTitle';

import {Grid, Row, Col} from 'react-flexbox-grid';
import TripListOptions from '../../features/TripListOptions/TripListOptionsContainer';

import textContent from '../../../data/textContent.json';

const TripsTextContent = textContent.pageContent.viewsContent.Trips;

const Trips = ({trips}) => (
  <Section>
    <Grid>
      <Row>
        <Col xs={12}>
          <PageTitle text={TripsTextContent.pageTitle} />
          <TripListOptions />
          <Row>
            {trips.length ? trips.map(trip => (
              <TripSummary key={trip.id} {...trip} />
            )) : (
              <p>{TripsTextContent.noResults}</p>
            )}
          </Row>
        </Col>
      </Row>
    </Grid>
  </Section>
);

Trips.propTypes = {
  trips: PropTypes.arrayOf(PropTypes.object),
};

export default Trips;
