import * as Permissions from 'expo-permissions'
import { View, Text } from 'react-native';

export default function PermissionItem({title, description, status}: {
    title: string;
    description: string;
    status: Permissions.PermissionStatus;
}) {
    const statusText = status === Permissions.PermissionStatus.GRANTED? 'Granted':
                        status === Permissions.PermissionStatus.DENIED? 'Denied': 'Not Asked';
    const statusColor = status === Permissions.PermissionStatus.GRANTED? 'green':
                        status === Permissions.PermissionStatus.DENIED? 'red': 'gray';

    return (
        <View style={{ marginBottom: 20 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ fontWeight: '600', fontSize: 18 }}>{title}</Text>
                <Text style={{ color: statusColor }}>{statusText}</Text>
            </View>
            <Text style={{ color: 'gray', marginTop: 5 }}>{description}</Text>
        </View>
    );
}