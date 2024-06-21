import type { Schema, Attribute } from '@strapi/strapi';

export interface EventsQuestionsCheckbox extends Schema.Component {
  collectionName: 'components_events_questions_checkboxes';
  info: {
    displayName: 'QuestionsCheckbox';
  };
  attributes: {
    QuestionFi: Attribute.String & Attribute.Required;
    QuestionEn: Attribute.String & Attribute.Required;
  };
}

export interface EventsQuestionsSelect extends Schema.Component {
  collectionName: 'components_events_questions_selects';
  info: {
    displayName: 'QuestionsSelect';
  };
  attributes: {
    QuestionEn: Attribute.String & Attribute.Required;
    QuestionFi: Attribute.String & Attribute.Required;
    ChoicesFi: Attribute.String & Attribute.Required;
    ChoicesEn: Attribute.String & Attribute.Required;
  };
}

export interface EventsQuestionsText extends Schema.Component {
  collectionName: 'components_events_questions_texts';
  info: {
    displayName: 'QuestionsText';
  };
  attributes: {
    QuestionFi: Attribute.String & Attribute.Required;
    QuestionEn: Attribute.String & Attribute.Required;
    MinLength: Attribute.Integer & Attribute.Required & Attribute.DefaultTo<10>;
    MaxLength: Attribute.Integer &
      Attribute.Required &
      Attribute.DefaultTo<500>;
    Required: Attribute.Boolean &
      Attribute.Required &
      Attribute.DefaultTo<true>;
  };
}

export interface EventsQuotas extends Schema.Component {
  collectionName: 'components_events_quotas';
  info: {
    displayName: 'Quotas';
    icon: 'television';
    description: '';
  };
  attributes: {
    RegistrationStartsAt: Attribute.DateTime & Attribute.Required;
    RegistrationEndsAt: Attribute.DateTime & Attribute.Required;
    TicketsTotal: Attribute.Integer &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      > &
      Attribute.DefaultTo<10>;
    RequiredRole: Attribute.Relation<
      'events.quotas',
      'oneToOne',
      'api::event-role.event-role'
    >;
    TicketsAllowedToBuy: Attribute.Integer &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      > &
      Attribute.DefaultTo<1>;
    Price: Attribute.Decimal &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      > &
      Attribute.DefaultTo<0>;
  };
}

export interface EventsRegistration extends Schema.Component {
  collectionName: 'components_events_registrations';
  info: {
    displayName: 'Registration';
    icon: 'key';
    description: '';
  };
  attributes: {
    Quotas: Attribute.Component<'events.quotas', true> &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    RolesToGive: Attribute.Relation<
      'events.registration',
      'oneToMany',
      'api::event-role.event-role'
    >;
    QuestionsText: Attribute.Component<'events.questions-text', true>;
    QuestionsSelect: Attribute.Component<'events.questions-select', true>;
    QuestionsCheckbox: Attribute.Component<'events.questions-checkbox', true>;
  };
}

export interface SharedContactBanner extends Schema.Component {
  collectionName: 'components_shared_contact_banners';
  info: {
    displayName: 'ContactBanner';
    icon: 'message';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    description: Attribute.Text & Attribute.Required;
    email: Attribute.Email & Attribute.Required;
  };
}

export interface SharedMetaOpenGraph extends Schema.Component {
  collectionName: 'components_shared_meta_open_graphs';
  info: {
    displayName: 'metaOpenGraph';
    icon: 'link';
    description: '';
  };
  attributes: {
    openGraphTitle: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 120;
      }>;
    openGraphDescription: Attribute.Text &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 300;
      }>;
    openGraphImage: Attribute.Media<'images'>;
  };
}

export interface SharedMetaTwitter extends Schema.Component {
  collectionName: 'components_shared_meta_twitters';
  info: {
    displayName: 'MetaTwitter';
    icon: 'twitter';
    description: '';
  };
  attributes: {
    twitterTitle: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 120;
      }>;
    twitterDescription: Attribute.Text &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 300;
      }>;
    twitterImage: Attribute.Media<'images'>;
  };
}

export interface SharedPageContent extends Schema.Component {
  collectionName: 'components_shared_page_contents';
  info: {
    displayName: 'PageContent';
    icon: 'write';
    description: '';
  };
  attributes: {
    title: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 100;
      }>;
    content: Attribute.Blocks & Attribute.Required;
    banner: Attribute.Media<'images'> & Attribute.Required;
  };
}

export interface SharedSeo extends Schema.Component {
  collectionName: 'components_shared_seos';
  info: {
    displayName: 'Seo';
    icon: 'search';
    description: '';
  };
  attributes: {
    metaTitle: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 120;
      }>;
    metaDescription: Attribute.Text &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 300;
      }>;
    metaAuthor: Attribute.String;
    metaKeywords: Attribute.String;
    openGraph: Attribute.Component<'shared.meta-open-graph'>;
    twitter: Attribute.Component<'shared.meta-twitter'>;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'events.questions-checkbox': EventsQuestionsCheckbox;
      'events.questions-select': EventsQuestionsSelect;
      'events.questions-text': EventsQuestionsText;
      'events.quotas': EventsQuotas;
      'events.registration': EventsRegistration;
      'shared.contact-banner': SharedContactBanner;
      'shared.meta-open-graph': SharedMetaOpenGraph;
      'shared.meta-twitter': SharedMetaTwitter;
      'shared.page-content': SharedPageContent;
      'shared.seo': SharedSeo;
    }
  }
}
