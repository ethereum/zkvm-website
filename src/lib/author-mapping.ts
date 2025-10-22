import { teamMembers } from '@/data/team';

/**
 * Maps author names to their Twitter accounts
 */
export function getAuthorTwitter(authorName: string): string | null {
  const teamMember = teamMembers.find(member => 
    member.name.toLowerCase() === authorName.toLowerCase()
  );
  
  return teamMember?.twitter || null;
}

/**
 * Gets the Twitter URL for an author
 */
export function getAuthorTwitterUrl(authorName: string): string | null {
  const twitter = getAuthorTwitter(authorName);
  if (!twitter) return null;
  
  // Remove @ if present and create URL
  const username = twitter.replace('@', '');
  return `https://twitter.com/${username}`;
}
