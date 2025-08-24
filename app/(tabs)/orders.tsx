import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useState } from 'react';
import { Clock, Users, CircleCheck as CheckCircle, Circle as XCircle, Plus, Minus } from 'lucide-react-native';

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  orderedBy: string;
}

interface Order {
  id: string;
  outingName: string;
  restaurant: string;
  status: 'ordering' | 'confirmed' | 'preparing' | 'ready';
  items: OrderItem[];
  totalAmount: number;
  participants: string[];
  estimatedTime: string;
}

export default function OrdersScreen() {
  const [activeOrder, setActiveOrder] = useState<Order>({
    id: '1',
    outingName: 'Friday Night Dinner',
    restaurant: 'The Italian Corner',
    status: 'ordering',
    totalAmount: 156.80,
    participants: ['You', 'Sarah', 'Mike', 'Emma'],
    estimatedTime: '25-35 min',
    items: [
      {
        id: '1',
        name: 'Margherita Pizza',
        price: 18.99,
        quantity: 2,
        image: 'https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg?auto=compress&cs=tinysrgb&w=800',
        orderedBy: 'You',
      },
      {
        id: '2',
        name: 'Caesar Salad',
        price: 12.50,
        quantity: 1,
        image: 'https://images.pexels.com/photos/257816/pexels-photo-257816.jpeg?auto=compress&cs=tinysrgb&w=800',
        orderedBy: 'Sarah',
      },
      {
        id: '3',
        name: 'Chicken Alfredo',
        price: 22.99,
        quantity: 1,
        image: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=800',
        orderedBy: 'Mike',
      },
    ],
  });

  const [availableItems] = useState([
    {
      id: '4',
      name: 'Tiramisu',
      price: 8.99,
      image: 'https://images.pexels.com/photos/6880219/pexels-photo-6880219.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      id: '5',
      name: 'Garlic Bread',
      price: 6.50,
      image: 'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ordering': return '#F97316';
      case 'confirmed': return '#3B82F6';
      case 'preparing': return '#EAB308';
      case 'ready': return '#10B981';
      default: return '#6b7280';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ordering': return <Clock size={20} color="#F97316" />;
      case 'confirmed': return <CheckCircle size={20} color="#3B82F6" />;
      case 'preparing': return <Clock size={20} color="#EAB308" />;
      case 'ready': return <CheckCircle size={20} color="#10B981" />;
      default: return <Clock size={20} color="#6b7280" />;
    }
  };

  const updateQuantity = (itemId: string, change: number) => {
    setActiveOrder(prev => ({
      ...prev,
      items: prev.items.map(item => 
        item.id === itemId && item.orderedBy === 'You' 
          ? { ...item, quantity: Math.max(0, item.quantity + change) }
          : item
      ).filter(item => item.quantity > 0),
      totalAmount: prev.items.reduce((total, item) => 
        total + (item.quantity * item.price), 0
      ),
    }));
  };

  const addItem = (newItem: any) => {
    const orderItem: OrderItem = {
      ...newItem,
      quantity: 1,
      orderedBy: 'You',
    };
    
    setActiveOrder(prev => ({
      ...prev,
      items: [...prev.items, orderItem],
      totalAmount: prev.totalAmount + newItem.price,
    }));
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Current Order</Text>
        <Text style={styles.subtitle}>{activeOrder.outingName}</Text>
      </View>

      {/* Order Status */}
      <View style={styles.statusContainer}>
        <View style={styles.statusCard}>
          <View style={styles.statusHeader}>
            {getStatusIcon(activeOrder.status)}
            <View style={styles.statusInfo}>
              <Text style={styles.statusTitle}>
                {activeOrder.status.charAt(0).toUpperCase() + activeOrder.status.slice(1)}
              </Text>
              <Text style={styles.restaurant}>{activeOrder.restaurant}</Text>
            </View>
            <Text style={styles.estimatedTime}>{activeOrder.estimatedTime}</Text>
          </View>
          
          <View style={styles.participantsContainer}>
            <Users size={16} color="#6b7280" />
            <Text style={styles.participantsText}>
              {activeOrder.participants.join(', ')}
            </Text>
          </View>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Current Items */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Items</Text>
          
          {activeOrder.items.map((item) => (
            <View key={item.id} style={styles.orderItem}>
              <Image source={{ uri: item.image }} style={styles.itemImage} />
              
              <View style={styles.itemContent}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
                <Text style={styles.orderedBy}>Ordered by {item.orderedBy}</Text>
              </View>
              
              {item.orderedBy === 'You' && activeOrder.status === 'ordering' && (
                <View style={styles.quantityControls}>
                  <TouchableOpacity 
                    style={styles.quantityButton}
                    onPress={() => updateQuantity(item.id, -1)}
                  >
                    <Minus size={16} color="#6b7280" />
                  </TouchableOpacity>
                  
                  <Text style={styles.quantity}>{item.quantity}</Text>
                  
                  <TouchableOpacity 
                    style={styles.quantityButton}
                    onPress={() => updateQuantity(item.id, 1)}
                  >
                    <Plus size={16} color="#6b7280" />
                  </TouchableOpacity>
                </View>
              )}
              
              {item.orderedBy !== 'You' && (
                <Text style={styles.quantity}>×{item.quantity}</Text>
              )}
            </View>
          ))}
        </View>

        {/* Add More Items */}
        {activeOrder.status === 'ordering' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Add More Items</Text>
            
            {availableItems.map((item) => (
              <TouchableOpacity 
                key={item.id} 
                style={styles.availableItem}
                onPress={() => addItem(item)}
              >
                <Image source={{ uri: item.image }} style={styles.itemImage} />
                
                <View style={styles.itemContent}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
                </View>
                
                <View style={styles.addButton}>
                  <Plus size={20} color="#10B981" />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Order Summary */}
        <View style={styles.summaryContainer}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>${activeOrder.totalAmount.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Tax</Text>
            <Text style={styles.summaryValue}>${(activeOrder.totalAmount * 0.08).toFixed(2)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Service Fee</Text>
            <Text style={styles.summaryValue}>$0.00</Text>
          </View>
          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>
              ${(activeOrder.totalAmount * 1.08).toFixed(2)}
            </Text>
          </View>
        </View>

        {/* Action Button */}
        {activeOrder.status === 'ordering' && (
          <TouchableOpacity style={styles.confirmButton}>
            <Text style={styles.confirmButtonText}>Confirm Order</Text>
          </TouchableOpacity>
        )}
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
    paddingHorizontal: 24,
    paddingTop: 64,
    paddingBottom: 24,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
  },
  statusContainer: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  statusCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  statusInfo: {
    flex: 1,
    marginLeft: 12,
  },
  statusTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
  },
  restaurant: {
    fontSize: 14,
    color: '#6b7280',
  },
  estimatedTime: {
    fontSize: 14,
    fontWeight: '600',
    color: '#10B981',
  },
  participantsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  participantsText: {
    fontSize: 14,
    color: '#6b7280',
    marginLeft: 8,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 16,
  },
  orderItem: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    alignItems: 'center',
  },
  availableItem: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    alignItems: 'center',
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  itemContent: {
    flex: 1,
    marginLeft: 12,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#10B981',
    marginBottom: 4,
  },
  orderedBy: {
    fontSize: 12,
    color: '#6b7280',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantity: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
    marginHorizontal: 12,
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f9f4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  summaryContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 16,
    color: '#6b7280',
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    paddingTop: 12,
    marginTop: 8,
    marginBottom: 0,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#10B981',
  },
  confirmButton: {
    backgroundColor: '#10B981',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 32,
  },
  confirmButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});