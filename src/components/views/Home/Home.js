import React from 'react';
import styles from './Home.scss';
import Section from '../../layout/Section/Section';
import Hero from '../../layout/Hero/Hero';
import List from '../../common/List/List';
import ListItem from '../../common/ListItem/ListItem';
import { Grid, Row, Col } from 'react-flexbox-grid';
import textContent from '../../../data/textContent.json';

const HomeTextContent = textContent.pageContent.viewsContent.Home;

const Home = () => (
  <Section variant='has-hero'>
    <Hero titleText='Let&apos;s explore.' imageSrc='http://uploads.kodilla.com/bootcamp/fer/13.router/image-1.jpg' />
    <Grid>
      <Row middle="md">
        <Col md={6}>
          <h1 className={styles.title}>{HomeTextContent.introTitle}</h1>
          <p className={styles.intro}>{HomeTextContent.introText}</p>
        </Col>
        <Col xs={12} md={5} mdOffset={1} xl={3} xlOffset={2}>
          <List variant='solid'>
            <ListItem title={HomeTextContent.pros1} icon='map-marker-alt' />
            <ListItem title={HomeTextContent.pros2} icon='hotel' />
            <ListItem title={HomeTextContent.pros3} icon='glass-martini-alt' />
            <ListItem title={HomeTextContent.pros4} icon='headset' />
          </List>
        </Col>
      </Row>
    </Grid>
  </Section>
);

export default Home;
