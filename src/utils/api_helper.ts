//this file is to help with formatting API requests and creating request bodies for POST requests in a type-safe manner.

export async function formatAPIRequest(template: string, values: any[]): Promise<string> {
    return template.replace(/{(\d+)}/g, (match, p1) => {
        const index = parseInt(p1, 10);
        return index < values.length ? String(values[index]) : match;
    });
}


export function requestBody( title: string, completed: boolean){
    const requestBody: CreatePostsRequestBody = {
        title,
        completed
    };
    return requestBody;
} 