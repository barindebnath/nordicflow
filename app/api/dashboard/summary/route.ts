export async function GET() {
  return Response.json({
    deploymentFrequency: 24,
    prReviewTimeHours: 13.2,
    mergeTimeHours: 19.1,
    testStability: 96.4,
    failedBuildsWeekly: 3,
    aiSummary: 'Team velocity slowed due to review bottlenecks in checkout-web.'
  });
}
