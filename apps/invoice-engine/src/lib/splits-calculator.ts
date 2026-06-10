/**
 * SmartKode — Financial Splits Calculator
 * 
 * Calculates the exact money distribution for every invoice:
 *   - Agency gets their finder fee (one-time per project)
 *   - Tech company gets their execution cut
 *   - Admin (you) keeps the remaining profit
 * 
 * All percentages are snapshotted from ProfitSettings at project creation time.
 */

interface SplitInput {
  totalAmount: number;
  agencyPercent: number;  // Snapshotted from ProfitSettings at project creation
  techPercent: number;    // Snapshotted from ProfitSettings at project creation
  isDirect: boolean;      // If true, agency gets 0% (repeat client)
}

interface SplitResult {
  agencyShare: number;
  techShare: number;
  adminShare: number;
  totalAmount: number;
}

export function calculateSplits(input: SplitInput): SplitResult {
  const { totalAmount, agencyPercent, techPercent, isDirect } = input;

  // If client is direct (repeat), agency gets nothing
  const effectiveAgencyPercent = isDirect ? 0 : agencyPercent;

  const agencyShare = Math.round((totalAmount * effectiveAgencyPercent / 100) * 100) / 100;
  const techShare = Math.round((totalAmount * techPercent / 100) * 100) / 100;
  const adminShare = Math.round((totalAmount - agencyShare - techShare) * 100) / 100;

  return {
    agencyShare,
    techShare,
    adminShare,
    totalAmount,
  };
}

/**
 * Calculate milestone-level splits for LARGE projects.
 * Each milestone has a percent_due of the total project value.
 */
export function calculateMilestoneSplits(
  milestoneAmount: number,
  agencyPercent: number,
  techPercent: number,
  isDirect: boolean
): SplitResult {
  return calculateSplits({
    totalAmount: milestoneAmount,
    agencyPercent,
    techPercent,
    isDirect,
  });
}
