export function shouldProcessMutation(mutation: MutationRecord): boolean {
  if ((mutation.target as Element).classList?.contains('amz-button-container')) {
    return false;
  }
  
  return mutation.addedNodes.length > 0 && (
    (mutation.target as Element).classList?.contains('s-result-list') ||
    (mutation.target as Element).classList?.contains('s-search-results') ||
    (mutation.target as Element).classList?.contains('puis-list-col-right')
  );
}