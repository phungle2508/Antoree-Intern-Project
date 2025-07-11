
interface Category {
    id: string;
    name: string;
}

const categoriesInit: Category[] = [
    {
        id: 'programming',
        name: 'Programming',
    },
    {
        id: 'web-development',
        name: 'Web Development',
    },
    {
        id: 'design',
        name: 'Design',
    },
    {
        id: 'data-science',
        name: 'Data Science',
    },
    {
        id: 'mobile-development',
        name: 'Mobile Development',
    },
    {
        id: 'artificial-intelligence',
        name: 'Artificial Intelligence',
    }
];

export default categoriesInit;
export type { Category };