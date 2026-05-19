
export type VisitScheduleDto = {
  id: string;
  visitDate: string;
  assignedStaff: string;
  status: string;
};

export type WaitlistEntryDto = {
  id: string;
  priorityNote: string;
  waitlistedAt: string;
  promotedAt?: string;
};

export type ParentEnquiry = {
  id: string;
  parentName: string;
  childName: string;
  preferredStartDate: Date | string;
  centreName: string;
  enquiryStatusId: string;
  enquiryStatusName: string;
  notes?: string;
  email?: string; 
  phone?: string; 
  dateOfBirth?: Date | string;
  createdAt?: Date | string;
  createdBy?: string;
  updatedAt?: Date | string;
  updatedBy?: string;
  statusChangedAt?: Date | string;
  statusChangedBy?: string;
  tenantId?: string;
  isDeleted?: boolean;
  isActive?: boolean;
  visitSchedules?: VisitScheduleDto[];
  waitlistEntry?: WaitlistEntryDto | null;
};

