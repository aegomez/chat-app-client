/* Adapted from source:
 * https://cloudinary.com/documentation/upload_widget#upload_widget_options
 * */

declare namespace cloudinary {
  type FileSource =
    | 'local'
    | 'url'
    | 'camera'
    | 'dropbox'
    | 'image_search'
    | 'facebook'
    | 'instagram';

  type EventResult =
    | SuccessEvent
    | CloseEvent
    | UploadAddedEvent
    | QueuesStartEvent
    | QueuesEndEvent
    | BatchCancelledEvent
    | SourceChangedEvent
    | TagsEvent
    | PublicIdEvent
    | RetryEvent
    | AbortEvent
    | DisplayChangedEvent
    | ShowCompletedEvent;

  interface ResultCallback {
    (error: string | null, result: EventResult): void;
  }

  interface WidgetObject {
    open:
      | ((notUsed: null, options: { files: string | string[] }) => void)
      | (() => void);
    close: (options?: { quiet: boolean }) => void;
    update: (options: UploadWidgetOptions) => void;
    hide: () => void;
    show: () => void;
    minimize: () => void;
    isShowing: () => boolean;
    isMinimized: () => boolean;
  }

  interface SignatureGenerator {
    (
      resultCallback: ResultCallback,
      parameters: {
        timestamp: number;
        public_id: string;
        eager: string;
      }
    ): string;
  }

  interface UploadWidgetOptions {
    // Required:
    cloudName: string;
    uploadPreset: string;
    // Widget behavior:
    sources?: FileSource[];
    encryption?: {
      key: string;
      iv: string;
    };
    defaultSource?: string;
    multiple?: false;
    maxFiles?: number;
    // Interactive cropping:
    cropping?: boolean;
    showSkipCropButton?: boolean;
    croppingAspectRatio?: number;
    croppingDefaultSelectionRatio?: number;
    croppingShowDimensions?: boolean;
    croppingCoordinatesMode?: 'custom' | 'face';
    croppingShowBackButton?: boolean;
    // Dropbox:
    dropboxAppKey?: string;
    // Facebook:
    facebookAppId?: string;
    // Image search:
    googleApiKey?: string;
    searchBySites?: string[];
    searchByRights?: boolean;
    // Instagram:
    instagramCliendId?: string;
    // Upload parameters:
    publicId?: string;
    folder?: string;
    tags?: string[];
    resourceType?: 'auto' | 'image' | 'video' | 'raw';
    context?: { [key: string]: string };
    uploadSignatureTimestamp?: number;
    // Client-side actions:
    clientAllowedFormats?: string[];
    maxFileSize?: number;
    maxImageFileSize?: number;
    maxVideoFileSize?: number;
    maxRawFileSize?: number;
    maxImageWidth?: number;
    maxImageHeight?: number;
    validateMaxWidthHeight?: boolean;
    minImageWidth?: number;
    minImageHeight?: number;
    croppingValidateDimensions?: boolean;
    maxChunkSize?: number;
    // Containing page update:
    form?: string;
    thumbnails?: string;
    thumbnailTransformation?:
      | string
      | {
          [key: string]: string | number;
        }[];
    // Customization:
    buttonClass?: string;
    buttonCaption?: string;
    theme?: 'default' | 'white' | 'minimal' | 'purple';
    styles?: {
      palette?: { [key: string]: string };
      fonts?: { [key: string]: string };
    };
    text?: {};
    // Advanced:
    showPoweredBy?: boolean;
    autoMinimize?: boolean;
    getUploadPresets?: (callback: (presets: string[]) => void) => void;
    language?: string;
    showAdvancedOptions?: boolean;
    showCompletedButton?: boolean;
    showUploadMoreButton?: boolean;
    singleUploadAutoClose?: boolean;
    queueViewPosition?: string;
    showInsecurePreview?: boolean;
  }

  interface WidgetOptions extends UploadWidgetOptions {
    // Widget behavior:
    secure?: boolean;
    uploadSignature?: string | SignatureGenerator;
    getTags?: (callback: (tags: string[]) => void, prefix: string) => void;
    preBatch?: (
      callback: (args: { cancel: true }) => void,
      data: { files: {}[] }
    ) => void;
    inlineContainer?: string | HTMLElement | null;
    fieldName?: string;
  }

  interface SuccessEvent {
    event: 'success';
    info: {
      [key: string]: string | number;
    };
  }
  interface CloseEvent {
    event: 'close';
  }
  interface UploadAddedEvent {
    event: 'upload-added';
    info: {
      file: {
        lastModified: number;
        lastModifiedDate: number;
        name: string;
        size: number;
        type: string;
      };
      publicId: string;
    };
  }
  interface QueuesStartEvent {
    event: 'queues-start';
  }
  interface QueuesEndEvent {
    event: 'queues-end';
    info: {};
  }
  interface BatchCancelledEvent {
    event: 'batch-cancelled';
    info: {
      reason: 'MAX_EXCEEDED' | 'INVALID_PUBLIC_ID';
    };
  }
  interface SourceChangedEvent {
    event: 'source-changed';
    info: {
      source: FileSource;
    };
  }
  interface TagsEvent {
    event: 'tags';
    info: {
      tags: string[];
    };
  }
  interface PublicIdEvent {
    event: 'publicid';
    info: {
      id: string;
    };
  }
  interface RetryEvent {
    event: 'retry';
    info: {
      ids: string[];
      all: boolean;
    };
  }
  interface AbortEvent {
    event: 'abort';
    info: {
      ids: string[];
      all: boolean;
    };
  }
  interface DisplayChangedEvent {
    event: 'display-changed';
    info: 'shown' | 'hidden' | 'minimized' | 'expanded';
  }
  interface ShowCompletedEvent {
    event: 'show-completed';
    info: {
      items: {
        id: string;
        name: string;
        size: number;
        type: string;
        status: string;
        done: boolean;
        progress: number;
        file: {};
        uploadInfo: {};
      }[];
    };
  }

  function setCloudName(name: string): void;

  function createUploadWidget(
    options: WidgetOptions,
    resultCallback: ResultCallback
  ): WidgetObject;

  function openUploadWidget(
    options: WidgetOptions,
    resultCallback: ResultCallback
  ): WidgetObject;

  function applyUploadWidget(
    element: HTMLElement,
    options: WidgetOptions,
    resultCallback: ResultCallback
  ): WidgetObject;
}
