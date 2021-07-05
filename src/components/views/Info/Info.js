import React from 'react';
import styles from './Info.scss';
import Section from '../../layout/Section/Section';
import PageTitle from '../../common/PageTitle/PageTitle';
import List from '../../common/List/List';
import ListItem from '../../common/ListItem/ListItem';
import {Grid, Row, Col} from 'react-flexbox-grid';
import textContent from '../../../data/textContent.json';

class Info extends React.Component {
  render() {
    const contactData = textContent.agencyData,
      InfoTextContent = textContent.pageContent.viewsContent.Info;

    return (
      <Section>
        <Grid>
          <Row middle="md">
            <Col md={12} lg={6}>
              <PageTitle text={InfoTextContent.pageTitle} />
              <p className={styles.intro}>{InfoTextContent.introText}</p>
            </Col>
            <Col md={12} lg={4} lgOffset={2}>
              <List variant='light'>
                <ListItem title={contactData.supportAgent} icon='headset' />
                <ListItem title={contactData.phone} icon='phone' />
                <ListItem title={contactData.email} icon='envelope' />
                <ListItem title={contactData.address} icon='map-marker-alt' />
              </List>
            </Col>
          </Row>
        </Grid>
      </Section>
    );
  }
}
export default Info;
