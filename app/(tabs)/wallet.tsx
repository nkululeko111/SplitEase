import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { Plus, Minus, CreditCard, DollarSign, TrendingUp, Wallet as WalletIcon } from 'lucide-react-native';

interface Transaction {
  id: string;
  type: 'deposit' | 'payment' | 'refund';
  amount: number;
  description: string;
  date: string;
  outingName?: string;
}

interface WalletData {
  balance: number;
  pendingAmount: number;
  transactions: Transaction[];
}

export default function WalletScreen() {
  const [walletData] = useState<WalletData>({
    balance: 127.50,
    pendingAmount: 45.30,
    transactions: [
      {
        id: '1',
        type: 'deposit',
        amount: 100.00,
        description: 'Added funds to wallet',
        date: '2025-01-10',
      },
      {
        id: '2',
        type: 'payment',
        amount: -32.75,
        description: 'Payment for Friday Night Dinner',
        date: '2025-01-10',
        outingName: 'Friday Night Dinner',
      },
      {
        id: '3',
        type: 'payment',
        amount: -28.50,
        description: 'Payment for Business Lunch',
        date: '2025-01-09',
        outingName: 'Business Lunch',
      },
      {
        id: '4',
        type: 'deposit',
        amount: 75.00,
        description: 'Added funds to wallet',
        date: '2025-01-08',
      },
      {
        id: '5',
        type: 'refund',
        amount: 15.25,
        description: 'Refund from cancelled order',
        date: '2025-01-07',
        outingName: 'Weekend Brunch',
      },
    ],
  });

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'deposit': return <Plus size={20} color="#10B981" />;
      case 'payment': return <Minus size={20} color="#EF4444" />;
      case 'refund': return <TrendingUp size={20} color="#3B82F6" />;
      default: return <DollarSign size={20} color="#6b7280" />;
    }
  };

  const getTransactionColor = (type: string) => {
    switch (type) {
      case 'deposit': return '#10B981';
      case 'payment': return '#EF4444';
      case 'refund': return '#3B82F6';
      default: return '#6b7280';
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Your Wallet</Text>
        <Text style={styles.subtitle}>Manage your SplitEase funds</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Balance Cards */}
        <View style={styles.balanceSection}>
          <View style={styles.balanceCard}>
            <View style={styles.balanceHeader}>
              <WalletIcon size={24} color="#10B981" />
              <Text style={styles.balanceLabel}>Available Balance</Text>
            </View>
            <Text style={styles.balanceAmount}>${walletData.balance.toFixed(2)}</Text>
          </View>

          <View style={styles.balanceCard}>
            <View style={styles.balanceHeader}>
              <DollarSign size={24} color="#F97316" />
              <Text style={styles.balanceLabel}>Pending Payments</Text>
            </View>
            <Text style={styles.pendingAmount}>${walletData.pendingAmount.toFixed(2)}</Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionSection}>
          <TouchableOpacity style={styles.actionButton}>
            <View style={styles.actionIcon}>
              <Plus size={24} color="#ffffff" />
            </View>
            <Text style={styles.actionText}>Add Funds</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.actionButton, styles.secondaryAction]}>
            <View style={[styles.actionIcon, styles.secondaryActionIcon]}>
              <CreditCard size={24} color="#10B981" />
            </View>
            <Text style={[styles.actionText, styles.secondaryActionText]}>Withdraw</Text>
          </TouchableOpacity>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>This Month</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>8</Text>
              <Text style={styles.statLabel}>Transactions</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>$234</Text>
              <Text style={styles.statLabel}>Total Spent</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>$89</Text>
              <Text style={styles.statLabel}>Money Saved</Text>
            </View>
          </View>
        </View>

        {/* Transaction History */}
        <View style={styles.historySection}>
          <Text style={styles.sectionTitle}>Recent Transactions</Text>
          
          {walletData.transactions.map((transaction) => (
            <View key={transaction.id} style={styles.transactionItem}>
              <View style={styles.transactionIcon}>
                {getTransactionIcon(transaction.type)}
              </View>
              
              <View style={styles.transactionContent}>
                <Text style={styles.transactionDescription}>
                  {transaction.description}
                </Text>
                {transaction.outingName && (
                  <Text style={styles.outingName}>{transaction.outingName}</Text>
                )}
                <Text style={styles.transactionDate}>{transaction.date}</Text>
              </View>
              
              <Text style={[
                styles.transactionAmount,
                { color: getTransactionColor(transaction.type) }
              ]}>
                {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
              </Text>
            </View>
          ))}
        </View>

        {/* Payment Methods */}
        <View style={styles.paymentSection}>
          <Text style={styles.sectionTitle}>Payment Methods</Text>
          
          <TouchableOpacity style={styles.paymentMethod}>
            <View style={styles.paymentMethodIcon}>
              <CreditCard size={20} color="#6b7280" />
            </View>
            <View style={styles.paymentMethodContent}>
              <Text style={styles.paymentMethodName}>•••• 4242</Text>
              <Text style={styles.paymentMethodType}>Visa Debit</Text>
            </View>
            <Text style={styles.paymentMethodStatus}>Default</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.addPaymentMethod}>
            <Plus size={20} color="#10B981" />
            <Text style={styles.addPaymentMethodText}>Add Payment Method</Text>
          </TouchableOpacity>
        </View>
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
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  balanceSection: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
    marginBottom: 24,
  },
  balanceCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  balanceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  balanceLabel: {
    fontSize: 14,
    color: '#6b7280',
    marginLeft: 8,
  },
  balanceAmount: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#10B981',
  },
  pendingAmount: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#F97316',
  },
  actionSection: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 32,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#10B981',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  secondaryAction: {
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#10B981',
  },
  actionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  secondaryActionIcon: {
    backgroundColor: '#f0f9f4',
  },
  actionText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryActionText: {
    color: '#10B981',
  },
  statsSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#10B981',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
  },
  historySection: {
    marginBottom: 32,
  },
  transactionItem: {
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
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  transactionContent: {
    flex: 1,
  },
  transactionDescription: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  outingName: {
    fontSize: 14,
    color: '#10B981',
    marginBottom: 2,
  },
  transactionDate: {
    fontSize: 12,
    color: '#6b7280',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  paymentSection: {
    marginBottom: 32,
  },
  paymentMethod: {
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
  paymentMethodIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  paymentMethodContent: {
    flex: 1,
  },
  paymentMethodName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  paymentMethodType: {
    fontSize: 14,
    color: '#6b7280',
  },
  paymentMethodStatus: {
    fontSize: 14,
    fontWeight: '600',
    color: '#10B981',
  },
  addPaymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f9f4',
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: '#10B981',
    borderStyle: 'dashed',
  },
  addPaymentMethodText: {
    color: '#10B981',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});