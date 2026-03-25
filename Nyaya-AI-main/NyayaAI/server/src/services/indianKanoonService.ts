import axios from 'axios';
import * as cheerio from 'cheerio';

export interface IndianKanoonCase {
  title: string;
  court: string;
  summary: string;
  link: string;
}

const IK_BASE_URL = 'https://indiankanoon.org';

export const scrapeIndianKanoon = async (query: string): Promise<IndianKanoonCase[]> => {
  try {
    // Determine the search query URL
    const searchUrl = `${IK_BASE_URL}/search/?formInput=${encodeURIComponent(query)}`;
    
    // Fetch the HTML
    const response = await axios.get(searchUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
      },
      timeout: 10000,
    });

    const html = response.data;
    const $ = cheerio.load(html);
    const results: IndianKanoonCase[] = [];

    // Parse the results from the DOM
    // Indian Kanoon search results usually have class .result_title and .headline
    $('.result_title').each((i, el) => {
      if (i >= 5) return false; // We only need top 5 external cases max as per requirements

      const titleNode = $(el).find('a');
      const title = titleNode.text().trim();
      const relativeLink = titleNode.attr('href') || '';
      const link = relativeLink ? `${IK_BASE_URL}${relativeLink}` : '';

      // Court name is sometimes in the "docsource" class or can be inferred (mocked if not found)
      const docsource = $(el).siblings('.docsource').text().trim() || 'Indian Court';
      let court = 'High Court';
      if (docsource.toLowerCase().includes('supreme court')) court = 'Supreme Court';
      else if (docsource.toLowerCase().includes('tribunal')) court = 'Tribunal';

      const summary = $(el).siblings('.headline').text().trim() || 'No summary available from Indian Kanoon.';

      if (title && link) {
        results.push({
          title,
          court,
          summary,
          link,
        });
      }
    });

    return results;
  } catch (error) {
    console.error('Error scraping Indian Kanoon:', error);
    return []; // Fallback to returning empty array so local DB results can still be used
  }
};
