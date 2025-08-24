import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useState } from 'react';
import { Plus, Users, Clock, MapPin, QrCode } from 'lucide-react-native';

interface Outing {
  id: string;
  name: string;
  restaurant: string;
  date: string;
  participants: number;
  totalAmount: number;
  status: 'active' | 'completed' | 'pending';
  image: string;
}

export default function HomeScreen() {
  const [outings] = useState<Outing[]>([
    {
      id: '1',
      name: 'Friday Night Dinner',
      restaurant: 'The Italian Corner',
      date: '2025-01-10',
      participants: 4,
      totalAmount: 156.80,
      status: 'active',
      image: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      id: '2',
      name: 'Birthday Celebration',
      restaurant: 'Sakura Sushi',
      date: '2025-01-08',
      participants: 6,
      totalAmount: 298.50,
      status: 'completed',
      image: 'https://images.pexels.com/photos/357756/pexels-photo-357756.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      id: '3',
      name: 'Business Lunch',
      restaurant: 'Green Garden Cafe',
      date: '2025-01-12',
      participants: 3,
      totalAmount: 0,
      status: 'pending',
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#10B981';
      case 'completed': return '#6b7280';
      case 'pending': return '#F97316';
      default: return '#6b7280';
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Welcome back!</Text>
          <Text style={styles.title}>Your Outings</Text>
        </View>
        <TouchableOpacity style={styles.createButton}>
          <Plus size={24} color="#ffffff" />
        </TouchableOpacity>
      </View>

      {/* Quick Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>12</Text>
          <Text style={styles.statLabel}>Total Outings</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>$1,247</Text>
          <Text style={styles.statLabel}>Money Saved</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>36</Text>
          <Text style={styles.statLabel}>Friends</Text>
        </View>
      </View>

      {/* Outings List */}
      <ScrollView style={styles.outingsList} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Recent Outings</Text>
        
        {outings.map((outing) => (
          <TouchableOpacity key={outing.id} style={styles.outingCard}>
            <Image source={{ uri: outing.image }} style={styles.outingImage} />
            
            <View style={styles.outingContent}>
              <View style={styles.outingHeader}>
                <Text style={styles.outingName}>{outing.name}</Text>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(outing.status) }]}>
                  <Text style={styles.statusText}>
                    {outing.status.charAt(0).toUpperCase() + outing.status.slice(1)}
                  </Text>
                </View>
              </View>
              
              <View style={styles.outingDetails}>
                <View style={styles.detailRow}>
                  <MapPin size={16} color="#6b7280" />
                  <Text style={styles.detailText}>{outing.restaurant}</Text>
                </View>
                
                <View style={styles.detailRow}>
                  <Clock size={16} color="#6b7280" />
                  <Text style={styles.detailText}>{outing.date}</Text>
                </View>
                
                <View style={styles.detailRow}>
                  <Users size={16} color="#6b7280" />
                  <Text style={styles.detailText}>{outing.participants} participants</Text>
                </View>
              </View>
              
              <View style={styles.outingFooter}>
                <Text style={styles.totalAmount}>
                  ${outing.totalAmount.toFixed(2)}
                </Text>
                {outing.status === 'active' && (
                  <TouchableOpacity style={styles.qrButton}>
                    <QrCode size={18} color="#ffffff" />
                    <Text style={styles.qrButtonText}>QR Pay</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 64,
    paddingBottom: 24,
    backgroundColor: '#ffffff',
  },
  greeting: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
  },
  createButton: {
    backgroundColor: '#10B981',
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingVertical: 16,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#10B981',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
  },
  outingsList: {
    flex: 1,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 16,
    marginTop: 8,
  },
  outingCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    overflow: 'hidden',
  },
  outingImage: {
    width: '100%',
    height: 120,
  },
  outingContent: {
    padding: 16,
  },
  outingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  outingName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#ffffff',
  },
  outingDetails: {
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  detailText: {
    fontSize: 14,
    color: '#6b7280',
    marginLeft: 8,
  },
  outingFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#10B981',
  },
  qrButton: {
    backgroundColor: '#10B981',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  qrButtonText: {
    color: '#ffffff',
    fontWeight: '600',
    marginLeft: 6,
    fontSize: 14,
  },
});