const { z } = require("zod");

const caregiverPermissionsSchema = z.object({
  canViewProfile: z.boolean().optional(),
  canViewVitals: z.boolean().optional(),
  canViewJournal: z.boolean().optional(),
  canViewTreatment: z.boolean().optional(),
  canReceiveAlerts: z.boolean().optional(),
});

module.exports = { caregiverPermissionsSchema };
