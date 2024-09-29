import { supabase } from './supabaseClient';

export const fetchPrompts = async () => {
    const { data, error } = await supabase.from('prompts').select('*');
    if (error) throw new Error(error.message);
    return data;
};

export const createPrompt = async (content: string) => {
    const { data, error } = await supabase.from('prompts').insert([{ content }]);
    if (error) throw new Error(error.message);
    return data;
};



// Fetch messages by prompt ID
export const fetchMessagesByPromptId = async (promptId: number) => {
    const { data, error } = await supabase.rpc('get_messages_by_prompt_id', { prompt_id: promptId });

    if (error) {
        console.error('Error fetching messages:', error);
        throw new Error(error.message);
    }
    return data;
};

export const deleteMesseges = async () => {
    const {data, error} = await supabase.rpc('delete_all_messages');
    if (error) throw new Error(error.message);
    return data;

};




export const fetchLatestPromptsWithMessages = async () => {
    const { data, error } = await supabase.rpc('get_latest_prompts_with_messages'); // Call the stored procedure

    if (error) throw new Error(error.message);
    return data;
};


export const editPrompt = async (id: number, newContent: string) => {
    // First, fetch the existing prompt to get the current content and the previous_version_id
    const { data: existingPrompt, error: fetchError } = await supabase
        .from('prompts')
        .select('*')
        .eq('id', id)
        .single();

    if (fetchError) throw new Error(fetchError.message);

    // Check if the old prompt already exists in the messages table
    const { data: existingMessage, error: checkError } = await supabase
        .from('messages')
        .select('*')
        .eq('prompt_id', id)
        .eq('content', existingPrompt.content)
        .single();

    if (checkError && checkError.code !== 'PGRST116') {
        // Handle other errors, but ignore if no record exists
        throw new Error(checkError.message);
    }

    // If the old prompt does not exist in messages, insert it
    if (!existingMessage) {
        const { error: insertOldMessageError } = await supabase
            .from('messages')
            .insert([{ prompt_id: id, content: existingPrompt.content }]); // Using the same prompt ID

        if (insertOldMessageError) throw new Error(insertOldMessageError.message);
    }

    // Store the new prompt content in the messages table
    const { error: insertNewMessageError } = await supabase
        .from('messages')
        .insert([{ prompt_id: id, content: newContent }]); // Using the same prompt ID

    if (insertNewMessageError) throw new Error(insertNewMessageError.message);
    
    return existingPrompt;
};



export const createMessage = async (promptId: string, content: string) => {
    const { data, error } = await supabase
        .from('messages')
        .insert([{ prompt_id: promptId, content }]);
    if (error) throw new Error(error.message);
    return data;
};

export const fetchFollowUps = async (promptId: string) => {
    const { data, error } = await supabase
        .from('follow_ups')
        .select('*')
        .eq('prompt_id', promptId);
    if (error) throw new Error(error.message);
    return data;
};

export const createFollowUp = async (promptId: string, content: string) => {
    const { data, error } = await supabase
        .from('follow_ups')
        .insert([{ prompt_id: promptId, content }]);
    if (error) throw new Error(error.message);
    return data;
};
