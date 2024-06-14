export async function truncateDescription (text: string):Promise<string>{
    if (text.length <= 57) {
      return text;
    }
    return text.substring(0, 57) + '...';
  };