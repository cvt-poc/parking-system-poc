"""create parking tables

Revision ID: 1a1c8d4e5f6g
Revises: 
Create Date: 2024-01-29 10:00:00.000000

"""
from alembic import op
import sqlalchemy as sa
from app.models.parking import VehicleType

# revision identifiers, used by Alembic.
revision = '1a1c8d4e5f6g'
down_revision = None
branch_labels = None
depends_on = None

def upgrade():
    # Create parking_spots table
    op.create_table(
        'parking_spots',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('spot_number', sa.String(), nullable=False),
        sa.Column('vehicle_type', sa.Enum(VehicleType), nullable=False),
        sa.Column('occupied', sa.Boolean(), nullable=False, default=False),
        sa.PrimaryKeyConstraint('id'),
        sa.UniqueConstraint('spot_number')
    )
    op.create_index('idx_spot_number', 'parking_spots', ['spot_number'])

    # Create vehicles table
    op.create_table(
        'vehicles',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('license_plate', sa.String(), nullable=False),
        sa.Column('vehicle_type', sa.Enum(VehicleType), nullable=False),
        sa.Column('entry_time', sa.DateTime(), nullable=False),
        sa.Column('exit_time', sa.DateTime(), nullable=True),
        sa.Column('parking_spot_id', sa.Integer(), nullable=False),
        sa.PrimaryKeyConstraint('id'),
        sa.ForeignKeyConstraint(['parking_spot_id'], ['parking_spots.id']),
    )
    op.create_index('idx_license_plate', 'vehicles', ['license_plate'])

def downgrade():
    op.drop_table('vehicles')
    op.drop_table('parking_spots')