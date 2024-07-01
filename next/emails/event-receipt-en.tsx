import {
  Body,
  Column,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Text,
} from '@react-email/components';

interface LuuppiEventReceiptProps {
  name: string;
  events: {
    name: string;
    date: string;
    location: string;
    price: number;
  }[];
}

export const LuuppiEventReceipt = ({
  name,
  events,
}: LuuppiEventReceiptProps) => (
  <Html>
    <Head />
    <Preview>Confirmation of Your Event Registration</Preview>
    <Body style={main}>
      <Container style={container}>
        <Img
          alt="Luuppi"
          height="80"
          src={'https://luuppi.fi/logo.png'}
          style={logo}
          width="160"
        />
        <Text style={paragraph}>Hello {name},</Text>
        <Text style={paragraph}>
          Thank you for registering for the event! Here is your registration
          confirmation.
        </Text>
        {events.map((event, index) => (
          <Section
            key={index}
            style={{
              ...productColumn,
              marginTop: index === 0 ? '0px' : '10px',
            }}
          >
            <Row>
              <Column>
                <Text style={productTitle}>{event.name}</Text>
                <Text style={productDescription}>{event.location}</Text>
                <Text style={productDescription}>{event.date}</Text>
              </Column>
              <Column align="right" style={productPriceWrapper}>
                <Text style={productPrice}>{event.price.toFixed(2)}€</Text>
              </Column>
            </Row>
          </Section>
        ))}
        <Hr style={productPriceLine} />
        <Section align="right">
          <Row>
            <Column align="right" style={tableCell}>
              <Text style={productPriceTotal}>TOTAL</Text>
            </Column>
            <Column style={productPriceVerticalLine} />
            <Column style={productPriceLargeWrapper}>
              <Text style={productPriceLarge}>
                {events.reduce((acc, event) => acc + event.price, 0).toFixed(2)}
                €
              </Text>
            </Column>
          </Row>
        </Section>
        <Text style={paragraph}>
          Best regards,
          <br />
          Luuppi ry - WWW/IT Team
        </Text>
        <Hr style={hr} />
        <Text style={footer}>Luuppi ry, Yliopistonkatu 58b, 33100 Tampere</Text>
        <Text style={footer}>Business ID: 0512347-2</Text>
      </Container>
    </Body>
  </Html>
);

LuuppiEventReceipt.PreviewProps = {
  name: 'Luuppilainen',
  events: [
    {
      name: 'Hämeenkadun appro',
      date: 'Aug 20, 2023',
      location: 'Hämeenkatu',
      price: 14.99,
    },
    {
      name: 'Pullapäivä',
      date: 'Aug 20, 2023',
      location: 'Piiklubi',
      price: 14.99,
    },
  ],
} as LuuppiEventReceiptProps;

export default LuuppiEventReceipt;

const main = {
  backgroundColor: '#ffffff',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
};

const logo = {
  margin: '0 auto',
};

const productColumn = {
  backgroundColor: '#f5f5fb',
  paddingLeft: '20px',
  color: '#1f2937',
  padding: '10px 20px',
  borderRadius: '8px',
};

const paragraph = {
  fontSize: '16px',
  lineHeight: '26px',
};

const hr = {
  borderColor: '#cccccc',
  margin: '20px 0',
};

const footer = {
  color: '#8898aa',
  fontSize: '12px',
  margin: '0',
};

const resetText = {
  margin: '0',
  padding: '0',
  lineHeight: 1.4,
};

const tableCell = { display: 'table-cell' };

const productTitle = { fontSize: '12px', fontWeight: '600', ...resetText };

const productDescription = {
  fontSize: '12px',
  color: '#1f2937',
  ...resetText,
};

const productPriceTotal = {
  margin: '0',
  color: 'rgb(102,102,102)',
  fontSize: '10px',
  fontWeight: '600',
  padding: '0px 30px 0px 0px',
  textAlign: 'right' as const,
};

const productPrice = {
  fontSize: '12px',
  fontWeight: '600',
  margin: '0',
};

const productPriceLarge = {
  margin: '0px 20px 0px 0px',
  fontSize: '16px',
  fontWeight: '600',
  whiteSpace: 'nowrap' as const,
  textAlign: 'right' as const,
};

const productPriceWrapper = {
  display: 'table-cell',
  padding: '0px 20px 0px 0px',
  width: '100px',
  verticalAlign: 'top',
};

const productPriceLine = { margin: '30px 0 0 0' };

const productPriceVerticalLine = {
  height: '48px',
  borderLeft: '1px solid',
  borderColor: 'rgb(238,238,238)',
};

const productPriceLargeWrapper = { display: 'table-cell', width: '90px' };
