import { Metadata } from 'next';
import DemoBuilder from './DemoBuilder';

export const metadata: Metadata = {
    title: 'Live AI Agent Demo | Digital Helper',
    description: 'See a custom AI chatbot built for your business in 60 seconds. Enter your business info and watch it come to life — no account required.',
    openGraph: {
        title: 'Live AI Agent Demo | Digital Helper',
        description: 'See a custom AI chatbot built for your business in 60 seconds.',
        type: 'website',
    },
};

export default function DemoPage() {
    return <DemoBuilder />;
}
