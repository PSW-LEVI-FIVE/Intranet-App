export interface TeamBuildingInvitation {
    id: number,
    doctorId: number,
    description: string,
    title: string,
    reason: string,
    place: string,
    startAt: Date,
    endAt: Date,
    invitationStatus: number
}