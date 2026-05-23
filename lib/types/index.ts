export type Repo = { id: string; name: string; owner: string; dxScore: number; openPrs: number; deployFreq: number };
export type PullRequest = { id: string; title: string; risk: 'Low' | 'Medium' | 'High'; filesChanged: number; loc: number; hoursOpen: number; reviews: number };
export type Build = { id: string; status: 'success' | 'failed'; duration: number; createdAt: string };
