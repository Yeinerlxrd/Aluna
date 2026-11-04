export type ReportCategory = 'acoso' | 'iluminacion' | 'zona_desolada' | 'otro';
export interface User { id: number; name: string; email: string; municipality_id?: number | null }
export interface Municipality { id: number; name: string; department?: string | null; country: string }
export interface Report { id: number; category: ReportCategory; reference: string; description: string; latitude?: number | null; longitude?: number | null; status: 'pending' | 'verified' | 'discarded'; municipality: Municipality; created_at: string }
export interface Paginated<T> { data: T[]; current_page: number; last_page: number }
export interface EmergencyService { id: string; name: string; description: string; phone: string; type: 'emergency' | 'support' | 'report'; available: string; source: string }
export interface SafeRoute { distanceKm: number; durationMinutes: number; coordinates: [number, number][] }
export interface NearbyPlace { id: string; name: string; type: string; latitude: number; longitude: number }
