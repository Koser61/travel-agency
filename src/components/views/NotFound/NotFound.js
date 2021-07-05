import React from 'react';
import {Grid} from 'react-flexbox-grid';
import Section from '../../layout/Section/Section';
import textContent from '../../../data/textContent.json';

const NotFoundTextContent = textContent.pageContent.viewsContent.NotFound;

const NotFound = () => (
  <Section>
    <Grid>
      <h1>{NotFoundTextContent}</h1>
    </Grid>
  </Section>
);

export default NotFound;
