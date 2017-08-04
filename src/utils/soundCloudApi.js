import SC from 'soundcloud';

export const clientId = '5ORR6OtFu3fhlEFQIUYuDz4hv85rlIGA';

export default function configureApi() {
  SC.initialize({
    client_id: clientId,
  });
}

export const getTracks = query => (
  SC.get('/tracks', {
    q: query,
    // license: 'cc-by-sa',
  })
);
