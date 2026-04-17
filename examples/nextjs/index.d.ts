// Type completion for BigdataWidgets library

// events.ts
type ChatMessageEvent = {
  prompt: string;
  researchEffort: "lite" | "standard" | "max-preview";
};

type OpenDocumentEvent = {
  documentId: string;
  isPrivate: boolean;
};

type OpenLinkEvent = {
  url: string;
};

type InitEvent = {
  widgetName: string;
};

type EventMetadata<TData> = {
  instanceName: string;
  data: TData;
};

type Events = {
  chatmessage: ChatMessageEvent;
  opendocument: OpenDocumentEvent;
  openlink: OpenLinkEvent;
  ready: InitEvent;
};

type EventType = keyof Events;
type EventData<TEventType extends EventType> = Events[TEventType];
type ExtendedEventData<TEventType extends EventType> = EventMetadata<
  EventData<TEventType>
>;
type EventHandler<TEventType extends EventType> = (
  event: ExtendedEventData<TEventType>,
) => void;

// theme.ts
type BigdataWidgetTheme = {
  primaryColor?: string;
  backgroundColor?: string;
  surfaceColor?: string;
  textColor?: string;
  textSecondaryColor?: string;
  borderColor?: string;
  fontFamily?: string;
  fontSize?: string;
  borderRadius?: string;
  width?: string;
  height?: string;
  fabSize?: string;
  fabPosition?: "bottom-right" | "bottom-left";
  preset?: "light" | "dark" | "auto";
};

type ComputedBigdataWidgetTheme = Required<BigdataWidgetTheme> & {
  isLightBackground: boolean;
};

// chat

type InlineAttributionConfig = {
  enabled: boolean;
  showBigdataMoreButton?: boolean;
  showWebMoreButton?: boolean;
};

type WidgetResearchConfig = {
  researchEffort?: "lite" | "standard" | "max-preview";
  suggestedQuestions?: Array<string>;
  inlineAttribution?: InlineAttributionConfig;
  showAdvancedControls?: boolean;
  placeholder?: string;
  headerTitle?: string;
  headerSubtitle?: string;
};

type ChatWidgetBranding = {
  showPoweredBy?: boolean;
  logoUrl?: string;
};

type ChatWidgetConfig = {
  container: string | HTMLElement;
  proxyUrl: string;
  manager?: BigdataWidgetManager;
  instanceId?: string;
  displayMode?: "embedded" | "floating";
  config?: WidgetResearchConfig;
  theme?: BigdataWidgetTheme;
  branding?: ChatWidgetBranding;
};

declare namespace BigdataAgent {
  class BigdataWidgetManager {
    baseTheme?: BigdataWidgetTheme;
    constructor(commonConfig?: { theme?: BigdataWidgetTheme });
    getInstance(name: string): BigdataWidget | undefined;
    trigger<TEvent extends EventType>(
      eventName: TEvent,
      eventData: ExtendedEventData<TEvent>,
      config?: { instanceName?: string },
    ): void;
  }

  class BigdataWidget {
    name: string;
    readonly destroyed: boolean;
    constructor(name: string, manager?: BigdataWidgetManager);
    addListener<TEvent extends EventType>(
      event: TEvent,
      handler: EventHandler<TEvent>,
    ): void;
    removeListener<TEvent extends EventType>(
      event: TEvent,
      handler: EventHandler<TEvent>,
    ): void;
    emit<TEvent extends EventType>(
      event: TEvent,
      eventData: EventData<TEvent>,
    ): void;
    destroy(): void;
  }

  class BigdataChatWidget extends BigdataWidget {
    readonly container: HTMLElement;
    constructor(config: ChatWidgetConfig);
  }
}

// document viewer
type DocumentViewerConfig = {
  container: string | HTMLElement;
  proxyUrl: string;
  instanceId?: string;
  theme?: BigdataWidgetTheme;
  manager?: BigdataWidgetManager;
};

declare namespace BigdataDocumentViewer {
  class BigdataWidgetManager {
    baseTheme?: BigdataWidgetTheme;
    constructor(commonConfig?: { theme?: BigdataWidgetTheme });
    getInstance(name: string): BigdataWidget | undefined;
    trigger<TEvent extends EventType>(
      eventName: TEvent,
      eventData: ExtendedEventData<TEvent>,
      config?: { instanceName?: string },
    ): void;
  }

  class BigdataWidget {
    name: string;
    readonly destroyed: boolean;
    constructor(name: string, manager?: BigdataWidgetManager);
    addListener<TEvent extends EventType>(
      event: TEvent,
      handler: EventHandler<TEvent>,
    ): void;
    removeListener<TEvent extends EventType>(
      event: TEvent,
      handler: EventHandler<TEvent>,
    ): void;
    emit<TEvent extends EventType>(
      event: TEvent,
      eventData: EventData<TEvent>,
    ): void;
    destroy(): void;
  }

  class BigdataDocumentWidget extends BigdataWidget {
    constructor(config: DocumentViewerConfigs);
  }
}
