export interface ToolDescription {
    title: string;
    text: string;
}

export interface ToolHowTo {
    title: string;
    steps: string[];
}

export interface ToolFeatures {
    title: string;
    list: string[];
}

export interface ToolFaqItem {
    q: string;
    a: string;
}

export interface ToolFaq {
    title: string;
    questions: ToolFaqItem[];
}

export interface ToolContent {
    title: string;
    tagline: string;
    description?: ToolDescription;
    howTo?: ToolHowTo;
    features?: ToolFeatures;
    faq?: ToolFaq;
}
