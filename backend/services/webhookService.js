/**
 * Service responsible for triggering outbound webhooks
 */
const triggerWebhook = async (job) => {
  const WEBHOOK_URL ="https://webhook.https://webhook.site/09ee77e2-1fc5-4945-ad31-3d39ebfa92f2";
  
  const payload = {
    jobId: job.id,
    taskName: job.taskName,
    priority: job.priority,
    payload: typeof job.payload === 'string' ? JSON.parse(job.payload) : job.payload,
    completedAt: job.completedAt
  };

  try {
    console.log(`[Webhook] Sending data for Job ${job.id} to ${WEBHOOK_URL}`);
    //In production: 
    // await fetch(WEBHOOK_URL, { 
    //   method: 'POST', 
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(payload) 
    // });
    return { success: true };
  } catch (error) {
    console.error(`[Webhook Error] Job ${job.id}:`, error.message);
    return { success: false, error: error.message };
  }
};

module.exports = { triggerWebhook };