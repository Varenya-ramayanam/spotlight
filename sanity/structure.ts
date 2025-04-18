import type { StructureResolver } from 'sanity/structure'

// Customize the desk structure
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.documentTypeListItem('startup').title('Startups'),
      S.documentTypeListItem('playlist').title('Playlists'),
      S.documentTypeListItem('author').title('Authors'),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) =>
          item.getId() &&
          !['startup', 'playlist', 'author'].includes(item.getId()!)
      ),
    ])
