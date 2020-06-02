import { GatewayMetadata } from '@nestjs/websockets';

export interface GatewayMetadataExtended extends GatewayMetadata {
    handlePreflightRequest: (req, res) => void;
}

export const GatewayOptions: GatewayMetadataExtended = {
    // Enable CORS
    handlePreflightRequest: (req, res) => {
        const headers = {
            'Access-Control-Allow-Headers': 'Content-Type, authorization, x-token',
            'Access-Control-Allow-Origin': req.headers.origin,
            'Access-Control-Allow-Credentials': true,
            'Access-Control-Max-Age': '1728000',
            'Content-Length': '0',
        };
        res.writeHead(200, headers);
        res.end();
    },
};
